// Git Class
function Git(name) {
	this.name = name;
	this.lastCommitId = -1;
	this.branches = [];

	let master = new Branch("master", null);
	this.branches.push(master);

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

// Checkout functionality
Git.prototype.checkout = function (branchName) {
	for (let i = this.branches.length; i--; ) {
		if (this.branches[i] === branchName) {
			console.log("Switching to existing branch + " + branchName);
			this.HEAD = this.branches[i];
			return this;
		}
	}
	// If branch not found
	let newBranch = new Branch(branchName, this.HEAD.commit);
	this.branches.push(newBranch);
	this.HEAD = newBranch;

	console.log("Switched to new branch: " + newBranch);
	return this;
};

// Commit history Tests

console.log("Git.checkout() test");
var repo = new Git("test");
repo.commit("Initial commit");

console.assert(repo.HEAD.name === "master"); // Should be on master branch.
repo.checkout("testing");
console.assert(repo.HEAD.name === "testing"); // Should be on new testing branch.
repo.checkout("master");
console.assert(repo.HEAD.name === "master"); // Should be on master branch.
repo.checkout("testing");
console.assert(repo.HEAD.name === "testing"); // Should be on testing branch again.
