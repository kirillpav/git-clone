// Git Class
function Git(name) {
	this.name = name;
	this.lastCommitId = -1;

	let master = new Branch("master", null);

	this.HEAD = master; // Ref to master branch
}

// Commit Class
function Commit(id, parent, message) {
	this.id = id;
	this.parent = parent;
	this.message = this.message;
}

// Branch Class
function Branch(name, commit) {
	this.name = name;
	this.commit = commit;
}
// Adding Commit to git class
Git.prototype.commit = function (message) {
	let commit = new Commit(++this.lastCommitId, this.HEAD.commit, message);
	this.HEAD.commit = commit;

	return commit;
};

// Log functionality on Git class
Git.prototype.log = function () {
	let commit = this.HEAD.commit,
		history = [];

	while (commit) {
		history.push(commit);
		// Following the parent
		commit = commit.parent;
	}

	return history;
};

// Commit history Tests
console.log("Git.log() Tests");
let repo = new Git("test-repo");
repo.commit("Initial commit");
repo.commit("Second commit");

let log = repo.log();
console.assert(log.length === 2); // Should have two commits
console.assert(!!log[0] && log[0].id === 1);
console.assert(!!log[1] && log[1].id === 0);
