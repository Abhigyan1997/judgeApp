exports.submission= async (req, res) => {
    const { code, language } = req.body;
    const userId = req.user.id; // assuming user ID is stored in the request object after authentication
  
    try {
      // Save the submission to the database
      const submission = new Submission({ userId, code, language });
      await submission.save();
  
      // Execute the code in a sandboxed environment
      const execution = spawn('python', ['-c', code]);
  
      let output = '';
  
      // Listen to the code execution process events
      execution.stdout.on('data', (data) => {
        output += data.toString();
      });
  
      execution.stderr.on('data', (data) => {
        output += data.toString();
      });
  
      execution.on('close', async (code) => {
        // Update the submission status and output
        submission.status = code === 0 ? 'success' : 'failed';
        submission.output = output;
        await submission.save();
  
        // Return the result
        res.json(submission);
      });
    } catch (error) {
      // Handle errors
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }

  exports.submissionId=async (req, res) => {
    const submissionId = req.params.id;
    const userId = req.user.id; // assuming user ID is stored in the request object after authentication
  
    try {
      // Fetch the submission from the database
      const submission = await Submission.findOne({ _id: submissionId, userId });
  
      if (!submission) {
        return res.status(404).json({ error: 'Submission not found' });
      }
  
      // Return the submission
      res.json(submission);
    } catch (error) {
      // Handle errors
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }