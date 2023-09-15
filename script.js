const prepDescription = document.getElementById("description");
const btnAdd = document.getElementById("btn-add");
const prepList = document.getElementById("prep-list");

// tasks default state

const state = {
  prepTasks: [
    { description: "check passport validity", done: true, id: 1 },
    { description: "pack camera", done: false, id: 2 },
  ],
};

btnAdd.addEventListener("click", addPrepTask);

// add tasks
prepList.addEventListener("change", updateTask);

function restoreTasks() {
  const storedTasks = JSON.parse(localStorage.getItem("prepTasks"));
  console.log("storedTasks", storedTasks);
  if (storedTasks) {
    state.prepTasks = storedTasks;
  }
}

function addPrepTask(event) {
  event.preventDefault();

  const newPrepTask = {
    description: prepDescription.value,
    done: false,
    id: Math.floor(Math.random() * 5000000),
  };

  // push tasks
  state.prepTasks.push(newPrepTask);

  //load tasks into local storage
  localStorage.setItem("prepTasks", JSON.stringify(state.prepTasks));

  restoreTasks();
  renderPrepTasks();
}

// show tasks by selected filter

const prepFilter = document.querySelectorAll("#prep-filter-list input");
prepFilter.forEach((prepFilter) => {
  prepFilter.addEventListener("change", () => {});
});

function getSelectedFilter() {
  let selectedFilter = null;

  prepFilter.forEach((input) => {
    if (input.checked) {
      selectedFilter = input.value;
    }
  });

  return selectedFilter;
}

function renderPrepTasks() {
  prepList.innerText = "";

  const selectedFilter = getSelectedFilter();

  state.prepTasks.filter((prepTasks) => {
    if (selectedFilter === "all") {
      return true;
    } else if (selectedFilter === "done") {
      return prepTasks.done;
    } else {
      return !prepTasks.done;
    }
  });

  state.prepTasks.forEach(function (prepTask) {
    const listEl = document.createElement("li");

    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.id = "prepTask" + prepTask.id;
    checkbox.checked = prepTask.done;
    console.dir(checkbox);

    checkbox.prepTaskId = prepTask.id;

    const description = document.createElement("label");

    description.htmlFor = checkbox.id;
    description.innerText = prepTask.description;

    listEl.appendChild(checkbox);
    listEl.appendChild(description);

    prepList.appendChild(listEl);
  });
}
// read prepTaskID from DOM
function updateTask(event) {
  const id = event.target.prepTaskId;

  const updatedTask = state.prepTasks.find(function (prepTask) {
    return prepTask.id === id;
  });

  updatedTask.done = event.target.checked;
  console.log(state.prepTasks);
}
restoreTasks();
renderPrepTasks();

//remove all done task (button remove is clicked)

//const btnRemove = document.getElementById("btn-remove");

//function removeDuplicateTasks {
//  if (prepTasks) {
//    return prepTasks = prepTasks.filter
//  }
//}
//  btnRemove.addEventListener("click", removeDuplicateItem);
