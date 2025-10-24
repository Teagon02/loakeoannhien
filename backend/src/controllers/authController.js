import bcrypt from "bcrypt";
import User from "../models/User.js";
import jwt from "jsonwebtoken";
import crypto from "crypto";
import Session from "../models/Session.js";

const ACCESS_TOKEN_TTL = "15m";
const REFRESH_TOKEN_TTL = 14 * 24 * 60 * 60 * 1000; // 14 days

// sign up
export const signUp = async (req, res) => {
  try {
    const { username, password, email } = req.body;
    if (!username || !password) {
      return res
        .status(400)
        .json({ message: "Vui lòng điền đầy đủ tên đăng nhập và mật khẩu" });
    }

    // kiểm tra username tồn tại chưa
    const duplicateUsername = await User.findOne({ username });
    if (duplicateUsername) {
      return res.status(409).json({ message: "Tên đăng nhập đã tồn tại" });
    }
    // mã hóa password
    const hashedPassword = await bcrypt.hash(password, 10); // 10 là số lần mã hóa
    // tạo user mới
    await User.create({ username, hashedPassword, email: email || "" });

    // return
    return res.status(204).json({ message: "Đăng ký thành công" });
  } catch (error) {
    console.error("Lỗi khi gọi signUp", error);
    return res.status(500).json({ message: "Lỗi hệ thống" });
  }
};

// login
export const loginUser = async (req, res) => {
  try {
    // lấy username và password từ client
    const { username, password } = req.body;
    if (!username || !password) {
      return res
        .status(400)
        .json({ message: "Vui lòng điền đầy đủ tên đăng nhập và mật khẩu" });
    }

    // lấy hashed password từ database để so sánh với password từ client
    const user = await User.findOne({ username });
    if (!user) {
      return res
        .status(401)
        .json({ message: "Tên đăng nhập hoặc mật khẩu không chính xác" });
    }

    // kiểm tra password
    const passwordCorrect = await bcrypt.compare(password, user.hashedPassword);
    if (!passwordCorrect) {
      return res
        .status(401)
        .json({ message: "Tên đăng nhập hoặc mật khẩu không chính xác" });
    }

    // nếu khớp, tạo accessToken với JWT
    const accessToken = jwt.sign(
      { userId: user._id },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: ACCESS_TOKEN_TTL }
    );

    // tạo refreshToken
    const refreshToken = crypto.randomBytes(64).toString("hex");

    // tạo session để lưu refreshToken
    await Session.create({
      userId: user._id,
      refreshToken,
      expiresAt: new Date(Date.now() + REFRESH_TOKEN_TTL),
    });

    // trả refreshToken về trong cookie
    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      secure: true,
      sameSite: "none", // backend và frontend chạy trên 2 domain khác nhau
      maxAge: REFRESH_TOKEN_TTL,
    });

    // trả accessToken về trong response
    return res.status(200).json({ accessToken });
  } catch (error) {
    console.error("Lỗi khi gọi loginUser", error);
    return res.status(500).json({ message: "Lỗi hệ thống" });
  }
};

// logout
export const logoutUser = async (req, res) => {
  try {
    // lấy refreshToken từ cookie
    const token = req.cookies?.refreshToken;
    if (token) {
      // xóa refreshToken trong Session
      await Session.deleteOne({ refreshToken: token });

      // xóa cookie
      res.clearCookie("refreshToken");
    }
    return res.status(200).json({ message: "Đăng xuất thành công" });
  } catch (error) {
    console.error("Lỗi khi gọi logoutUser", error);
    return res.status(500).json({ message: "Lỗi hệ thống" });
  }
};
