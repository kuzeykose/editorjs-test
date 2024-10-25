export const decideWrapper = (tagName: "bold" | "italic" | "a") => {
    switch (tagName) {
        case "bold":
            return "strong";
        case "italic":
            return "em";
        default:
            return tagName;
    }
};
