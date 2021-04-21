const patterns = {
  github: /^(https?:\/\/)?(www\.)?github\.com\/[a-zA-Z0-9_]{1,25}$/igm,
  facebook: /(https?:\/\/)?(www\.)?(facebook|fb|m\.facebook)\.(com|me)\/[\W\S_]{1,25}$/igm,
  linkedin: /(ftp|http|https):\/\/?((www|\w\w)\.)?linkedin.com(\w+:{0,1}\w*@)?(\S+)(:([0-9])+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?/,
  // instagram: /(?:https?:)?\/\/(?:www\.)?(?:instagram\.com|instagr\.am)\/(?P<username>[A-Za-z0-9_](?:(?:[A-Za-z0-9_]|(?:\.(?!\.))){0,28}(?:[A-Za-z0-9_]))?)/,
  instagram: /^(https?:\/\/)?(www\.)?instagram\.com\/[\W\S_]{1,25}\/$/igm,
}
function validateUrl(value, expression) {
  if (value == "") {
    return true;
  }
  var regexp = new RegExp(expression);
  return regexp.test(value);
}

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
  if (name === "currentCourses") {
    if (value.length === 0) return "Please choose at least one course";
  }
  if (name === "github") {
    if (validateUrl(value, patterns.github) === false) {
      return "Invalid GitHub address"
    }
    return ""
  }
  if (name === "facebook") {
    if (validateUrl(value, patterns.facebook) == false) {
      return "Invalid Facebook address"
    }
  }
  if (name === "linkedin") {
    if (validateUrl(value, patterns.linkedin) == false) {
      return "Invalid LinkedIn address"
    }
  }
  if (name === "instagram") {
    if (validateUrl(value, patterns.instagram) == false) {
      return "Invalid Instagram address"
    }
  }
}
