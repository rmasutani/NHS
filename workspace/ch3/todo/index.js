"use strict";
// { name: タスクの文字列, state: 完了しているかどうかの真偽値 }
let tasks = [];

const fs = require("fs");
const fileName = "./tasks.json";

// 同期的にファイルから復元
try {
  const data = fs.readFileSync(fileName, "utf-8");
  tasks = JSON.parse(data);
} catch (ignore) {
  console.log(fileName + "から復元できませんでした.");
}

/**
 * Save tasks to file
 */
function saveTasks() {
  fs.writeFileSync(fileName, JSON.stringify(tasks), "utf8");
}

/**
 * Add TODO
 * @param {string} task
 */
function add(task) {
  tasks.push({ name: task, state: false });
  saveTasks();
}

/**
 * Get array of TODOs
 * @returns {array}
 */
function list() {
  return tasks.filter((task) => isNotDone(task)).map((t) => t.name);
}

/**
 * Switch TODO state to "done"
 * @param {string} task
 */
function done(task) {
  const indexFound = tasks.findIndex((t) => t.name === task);
  if (indexFound !== -1) {
    tasks[indexFound].state = true;
    saveTasks();
  }
}

/**
 * Get array of tasks whose state is "done"
 * @returns {array}
 */
function donelist() {
  return tasks.filter((t) => isDone(t)).map((t) => t.name);
}

/**
 * 項目を削除する
 * @param {string} task
 */
function del(task) {
  const indexFound = tasks.findIndex((t) => t.name === task);
  if (indexFound !== -1) {
    tasks.splice(indexFound, 1);
    saveTasks();
  }
}

/**
 * タスクと完了したかどうかが含まれるオブジェクトを受け取り、完了したかを返す
 * @param {object} taskAndIsDonePair
 * @return {boolean} 完了したかどうか
 */
function isDone(taskAndIsDonePair) {
  return taskAndIsDonePair.state;
}

/**
 * タスクと完了したかどうかが含まれるオブジェクトを受け取り、完了していないかを返す
 * @param {object} taskAndIsDonePair
 * @return {boolean} 完了していないかどうか
 */
function isNotDone(taskAndIsDonePair) {
  return !isDone(taskAndIsDonePair);
}

module.exports = { add, list, done, donelist, del };
