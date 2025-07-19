const pollManager = require("../models/PollManager");

exports.createGroup = (req, res) => {
  const { groupName } = req.body;
  if (!groupName)
    return res.status(400).json({ message: "Group name required" });

  const success = pollManager.createGroup(groupName);
  if (!success)
    return res.status(400).json({ message: "Group already exists" });
  res.json({ message: "Group created" });
};

exports.createPoll = (req, res) => {
  const { groupName, question, options } = req.body;
  if (
    !groupName ||
    !question ||
    !options ||
    !Array.isArray(options) ||
    options.length < 2
  ) {
    return res.status(400).json({ message: "Invalid poll data" });
  }

  const poll = pollManager.createPoll(groupName, question, options);
  if (!poll) return res.status(404).json({ message: "Group not found" });

  res.json(poll);
};

exports.getPolls = (req, res) => {
  const { groupName } = req.params;
  const polls = pollManager.getPolls(groupName);
  if (!polls) return res.status(404).json({ message: "Group not found" });
  res.json(polls);
};
