
import dbConnect from '@/lib/dbConnect'; // your MongoDB connection util
import User from '@/models/User'; // your Mongoose User model
import bcrypt from 'bcryptjs';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  const { email, password } = req.body;

  try {
    await dbConnect();

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(401).json({ message: 'User not found' });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid password' });
    }

    // ✅ Login successful, return user data (but don't return the password)
    res.status(200).json({
      user: {
        id: user._id,
        email: user.email,
        name: user.name || '',
      },
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ message: 'Server error' });
  }
}
