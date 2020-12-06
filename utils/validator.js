export default function checkInput(name, value) {
  if (name === "name") {
    if (value === "") return "Name is required";
  }
  if (name === "major") {
    if (value === "") return "Major is required";
  }
  if (name === "skills") {
    if (value.length === 0) return "Please choose at least one skill";
  }
  if (name === "courses") {
    if (value.length === 0) return "Please choose at least one course";
  }
}
