import User from "../models/User.js";

const ensureAdmin = async () => {
  const adminExists = await User.findOne({ email: "admin@example.com" });
  if (adminExists) return;

  await User.create({
    name: "Admin",
    email: "admin@example.com",
    password: "Admin@123", // plain; pre-save hook hashes once
    role: "admin",
  });

  console.log("🔥 Default admin created:");
  console.log("  Email: admin@example.com");
  console.log("  Password: Admin@123");
};

export default ensureAdmin;
