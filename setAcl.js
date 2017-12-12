module.exports = function (reads, writes) {
  const acl = new this.Acl;
  for (let i = 0; i < reads.length; i += 1) {
    const role = reads[i];
    // Check public read access
    if (role === '*') {
      acl.setPublicReadAccess(true);
      continue;
    }
    if (role instanceof this.User) {
      acl.setUserReadAccess(role, true);
    } else {
      acl.setRoleReadAccess(role, true);
    }
  }
  for (let i = 0; i < writes.length; i += 1) {
    const role = writes[i];
    // Check public read access
    if (role === '*') {
      acl.setPublicWriteAccess(true);
      continue;
    }
    if (role instanceof this.User) {
      acl.setUserWriteAccess(role, true);
    } else {
      acl.setRoleWriteAccess(role, true);
    }
  }
  return acl;
};
