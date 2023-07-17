exports.signup=async(req,res)=>{
    const { username, password } = req.body;

    try {
      // Check if the username is already taken
      const existingUser = await User.findOne({ username });
      if (existingUser) {
        return res.status(409).json({ error: 'Username already exists' });
      }
  
      // Hash the password
      const hashedPassword = await bcrypt.hash(password, 10);
  
      // Create a new user
      const user = new User({ username, password: hashedPassword });
      await user.save();
  
      res.json({ message: 'User registered successfully' });
    } catch (error) {
      // Handle errors
      res.status(500).json({ error: 'Internal Server Error' });
    }
}

