// Git Class
function Git(name) {
	this.name = name;
	this.lastCommitId = -1;
}

let repo = new Git("my-repo");

// Commit Class
function Commit(id) {
	this.id = id;
}
// Adding Commit to git class
Git.prototype.commit = function (message) {
	let commit = new Commit(++this.lastCommitId, message);
	return commit;
};

// Log functionality on Git class
Git.prototype.log = function () {
	let history = [];

	return history;
};
