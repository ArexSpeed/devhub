/* eslint-disable no-unused-vars */

// ***** Schema for data just for view *****//

const users = [
  {
    userid: 1, //id gives by mongo
    name: 'Arek Cichocki',
    email: "arek@mail'com",
    password: '', //password with hash by backend
    imageUrl: '', //url to avatar image uploaded with cloudinary
    position: 'Frontend Developer', //select Frontend Developer | Backend Developer | Fullstack Developer | UX/UI Designer
    languages: ['pl', 'en', 'ger'], // pl, en, ger, ru, uk, sp, fr, it
    skills: ['react', 'node', 'typescript', 'javascript', 'css'], //array with skills (I'll add all skills later)
    social: [
      { name: 'website', link: 'https://ownwebsite.com' },
      { name: 'facebook', link: 'https://example.com' },
      { name: 'linkedin', link: 'https://example.com' },
      { name: 'twitter', link: 'https://example.com' },
      { name: 'github', link: 'https://example.com' },
      { name: 'dribbble', link: 'https://example.com' }
    ] // all social link which user add own data
  }
];

const post = [
  {
    postid: 1, // id adding by creating new post
    userid: 1, //id from author who write this post
    username: 'Arek Cichocki', // name post author
    userimage: '', //url from user to show in post
    image: '', // image for this post (also cloudinary)
    date: '', // create data
    category: 'Frontend', // Frontend | Backend | Design
    title: 'Post 1',
    excerpt: '', //short description show in main blog site (in post box)
    content: '', // longo content show only users get into post /blog/id
    likes: [1, 2, 3], //id users who like this post and count it
    comments: [] //comments later
  }
];

const events = [
  {
    eventid: 1,
    date: '12.05.2022 11:00',
    duration: 2, //duration time in hour
    title: 'Event 1',
    tags: ['react', 'javascript'], //choose main technology about this event
    participants: [1, 2, 3] //id of users who will save this event and count it
  }
];

const projects = [
  {
    projectid: 1,
    title: 'Project 1',
    userid: 1, //id from author who made this project
    username: 'Arek Cichocki', // name project author
    userimage: '', //url from user to show in post
    logo: '', //link to uploaded log for project
    link: '', //link to project website
    description: '',
    technology: ['react', 'node', 'mongo'], //tech stack used in project
    likes: [1, 2, 3] // users id who likes this project and count it
  }
];
