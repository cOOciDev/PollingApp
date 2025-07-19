const pollManager = require("../models/PollManager");

exports.joinGroup = (req, res) => {
  const { groupName, username } = req.body;
  if (!groupName || !username)
    return res.status(400).json({ message: "Missing groupName or username" });

  const success = pollManager.addUserToGroup(groupName, username);
  if (!success) return res.status(404).json({ message: "Group not found" });

  res.json({ message: "Joined group" });
};

exports.vote = (req, res) => {
  const { groupName, pollId, optionIndex } = req.body;
  if (!groupName || !pollId || optionIndex === undefined)
    return res.status(400).json({ message: "Missing vote data" });

  const success = pollManager.vote(groupName, pollId, optionIndex);
  if (!success) return res.status(400).json({ message: "Vote failed" });

  res.json({ message: "Vote recorded" });
};
