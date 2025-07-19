const EventEmitter = require("events");

class PollManager extends EventEmitter {
  constructor() {
    super();
    this.groups = {}; // { groupName: { polls: [], users: Set } }
  }

  createGroup(name) {
    if (this.groups[name]) return false;
    this.groups[name] = { polls: [], users: new Set() };
    return true;
  }

  addUserToGroup(groupName, username) {
    const group = this.groups[groupName];
    if (!group) return false;
    group.users.add(username);
    return true;
  }

  createPoll(groupName, question, options) {
    const group = this.groups[groupName];
    if (!group) return null;
    const poll = {
      id: Date.now().toString(),
      question,
      options: options.map((opt) => ({ option: opt, votes: 0 })),
      active: true,
    };
    group.polls.push(poll);
    this.emit("pollUpdated", groupName);
    return poll;
  }

  vote(groupName, pollId, optionIndex) {
    const group = this.groups[groupName];
    if (!group) return false;
    const poll = group.polls.find((p) => p.id === pollId);
    if (!poll || !poll.active) return false;
    if (poll.options[optionIndex]) {
      poll.options[optionIndex].votes++;
      this.emit("pollUpdated", groupName);
      return true;
    }
    return false;
  }

  getPolls(groupName) {
    const group = this.groups[groupName];
    return group ? group.polls : null;
  }
}

module.exports = new PollManager();
