const fs = require('fs');
const path = require('path');

class Database {
  constructor(filePath) {
    this.filePath = filePath;
    this._ensureDirectory();
    this._load();
  }

  _ensureDirectory() {
    const dir = path.dirname(this.filePath);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
  }

  _load() {
    if (fs.existsSync(this.filePath)) {
      this.data = JSON.parse(fs.readFileSync(this.filePath, 'utf8'));
    } else {
      this.data = { users: [], accounts: [], transactions: [], sequences: {} };
      this._persist();
    }
  }

  _persist() {
    fs.writeFileSync(this.filePath, JSON.stringify(this.data, null, 2));
  }

  reset() {
    this.data = { users: [], accounts: [], transactions: [], sequences: {} };
    this._persist();
  }

  _nextId(table) {
    const current = this.data.sequences[table] ?? 0;
    this.data.sequences[table] = current + 1;
    return this.data.sequences[table];
  }

  insert(table, row) {
    const id = this._nextId(table);
    const record = { id, ...row };
    this.data[table].push(record);
    this._persist();
    return { changes: 1, lastInsertRowid: id };
  }

  update(table, id, updates) {
    const collection = this.data[table];
    const index = collection.findIndex((item) => item.id === id);
    if (index === -1) {
      return { changes: 0 };
    }
    collection[index] = { ...collection[index], ...updates };
    this._persist();
    return { changes: 1 };
  }

  deleteWhere(table, predicate) {
    const before = this.data[table].length;
    this.data[table] = this.data[table].filter((item) => !predicate(item));
    const after = this.data[table].length;
    this._persist();
    return { changes: before - after };
  }

  findById(table, id) {
    return this.data[table].find((item) => item.id === id) ?? null;
  }

  all(table, predicate = () => true) {
    return this.data[table].filter(predicate);
  }

  paginate(table, { page = 1, pageSize = 10, predicate = () => true } = {}) {
    const filtered = this.all(table, predicate);
    const total = filtered.length;
    const start = (page - 1) * pageSize;
    const data = filtered.slice(start, start + pageSize);
    return { data, total };
  }
}

module.exports = Database;
module.exports.default = Database;
