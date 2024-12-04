import Caption from "../../models/Caption";

const canyonView = new Caption({
    id: 'canyonview',
    title: 'Canyon View',
    description: 'A beautiful view of the canyon from the top of the cliff (some pesky trees in the way)',
    imageUrl: '/photos/canyonview.png',
    category: 'photo',
    date: '2022-06-10',
    location: 'Grand Canyon of the Yellowstone, Yellowstone National Park, Wyoming, United States'
});

export default canyonView;