export default function checkInput(name, value) {
    if (name === "name") {
        if (value === "") return "Name is required";
    }
    if (name === "course") {
        if (value === "") return "Major is required";
    }
}
