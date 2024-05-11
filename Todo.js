let getTaskValue = "";
document.getElementById("add-task-button").disabled = true;
let getInputChange = document.getElementById("input-change");
function onInputChange(index = undefined) {
  getInputChange.addEventListener("keyup", (e) => {
    getTaskValue = e.target.value;
    if (getTaskValue?.length) {
      document.getElementById("add-task-button").disabled = false;
    }
    if (getTaskValue?.length && index !== undefined) {
      getTaskList[index] = getTaskValue;
    }
  });
}
function clearInput() {
  getInputChange.value = "";
}

let getTaskList = [];
//onClick of Add task
function onAddTaskClick() {
  if (
    getTaskValue?.length &&
    !getTaskList.find((item) => item === getTaskValue)
  ) {
    getTaskList.push(getTaskValue);
  }
  displayList(getTaskList);
  clearInput();
}
let getDisplayOuterContainer = document.getElementById(
  "display-outer-container"
);

function displayList(getTaskList) {
  getDisplayOuterContainer.innerHTML = "";

  getTaskList.forEach((item, index) => {
    let getDisplayContainer = document.createElement("div");
    getDisplayContainer.id = "display-container";

    let getDisplayContainerItem = document.createElement("p");

    getDisplayContainerItem.id = "display-task";
    getDisplayContainerItem.setAttribute("key", `${index}`);
    getDisplayContainerItem.innerHTML = item;

    //create div element for remove task button and append it to display container
    let getRemoveTaskElement = document.createElement("button");
    getDisplayContainerItem.id = "remove-task";
    getRemoveTaskElement.className = "button-element";
    getDisplayContainerItem.setAttribute("key", `${index}`);
    getRemoveTaskElement.innerHTML = "X";
    getRemoveTaskElement.addEventListener("click", function () {
      removeTask(index, item);
    });

    //create div element for editing the exiting task name
    let getEditTaskElement = document.createElement("button");
    getEditTaskElement.id = "edit-task";
    getEditTaskElement.className = "button-element";
    getEditTaskElement.setAttribute("key", `${index}`);
    getEditTaskElement.innerHTML = "Edit";
    getEditTaskElement.addEventListener("click", function () {
      editTask(index, item);
    });

    getDisplayContainer.appendChild(getDisplayContainerItem);
    getDisplayContainer.appendChild(getRemoveTaskElement);
    getDisplayContainer.appendChild(getEditTaskElement);
    getDisplayOuterContainer.appendChild(getDisplayContainer);
  }); //create div element for each todo task in the list and append it to display container
}

function removeTask(index, taskItem) {
  const filteredList = getTaskList.filter((item, i) => index !== i);
  getTaskList = [...filteredList];
  displayList(filteredList);
}

//edit Exiting task item
function editTask(index, item) {
  getInputChange.value = item;
  //go to onInputChange function to edit existing task name
  onInputChange(index);
}
