# Welcome to Mystagram Nextjs! 🔥🔥🔥

Hi! My name is Tran Thai Dan, currently a third-year student of a university in Hanoi. For a few months of learning Javascript and other technology. I decide to create this pet project base on `instagram` called **Mystagram** using **Nextjs**.  
This project is for revision from what i learn, and i hope this will help me find a good opportunity to have a internship job.

## Installation

After clone this repository, you must install all packages of this project to run this app.

```bash
  npm install
```

Waiting for all the packages downloaded, you can run this app by using this:

```bash
  npm run dev
```

## Environment Variables

To run this project, you will need to add the following environment variables to your **next.config.js** file

```bash
/** @type {import('next').NextConfig} */

const nextConfig = {
  swcMinify: true,
  styledComponents: true,

  cssModules: true,
  images: {
    domains: ["res.cloudinary.com"],
  },
  env: {
    API_URL: "http://localhost:4000",
  },
};

module.exports = nextConfig;

```

## Tech Stack

- **Primary technology:** React(Nextjs)
- **State management:** React-redux, @redux/toolkit, redux-persist
- **CSS:** styled-components
- **Components:** Material-UI
- **Form validation:** react-hook-form, yup, @hookform/resolvers

## Demo

Insert gif or link to demo
