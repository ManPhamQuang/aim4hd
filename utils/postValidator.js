export default function checkInput(name, value) {
    if (name === "name") {
        if (value === "") return "Name is required";
    }
    // if (name === "course") {
    //     if (value === "") return "Major is required";
    // }
    if (name === "aiming") {
        if (value === "") return "Aiming is required";
    }
    if (name === "content") {
        if (value === "") return "Content is required";
    }
}
