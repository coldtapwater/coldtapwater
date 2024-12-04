import Caption from "../../models/Caption";

const branch = new Caption({
    id: "branch",
    title: "Macro Tree Branch",
    description: "A macro shot of a broken tree branch I found on the floor",
    imageUrl: "/photos/treebranch.png",
    category: "photo",
    date: "2022-06-10",
    location: "Grand Canyon of the Yellowstone, Yellowstone National Park, Wyoming, United States",
});

export default branch;