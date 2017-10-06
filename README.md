# TetrAIs

## CSCI 3308 course project

### Members
Jake Liebow, Dingjun Weng, Albert Dayn

### Description
We are going to make a website where users can play Tetris in their browsers.
To provide a more authentic, retro experience, users will be asked for a name at the end of their play to put up on a global leaderboard.
If time permits, we will add the ability to store speedruns of the game so players can see how others got to their high scores.
For a more modern twist on this beloved game, we will use Tensor-flow to learn an AI to play Tetris at the same time as the user, so players can compete against a challenging AI in realtime.
We call this Tetris-mastering algorithm: TetrAIs.
It will play the same game as the player, with blocks falling at the same time for each oponent.
TetrAIs will be the ultimate competitor to even the most skilled players, testing their resolve.
With the AI always learning and getting better, we force the user to continuously improve if they want to keep up.

### Vision Statement
Here at TetrAIs we are commited to providing you with the most challenging Tetris opponent you have ever faced, a machine learning algorithm that evolves with every challenge it faces.
TetrAIs is always getting better... Are you?

### Motivation
We wanted to use this project as an oportunity to learn about machine learning and tensor-flow, and to create an awesome, fun game in the process.

### Risks
As with any deep learning project, it may take too long to train a useable AI to solve the problem of playing Tetris.
Our team has a lack of experience with both front end development and machine learning using neural nets.

### Risk Mitigation Plan
We will start on the AI as soon as possible to reduce the risk of not having enough time for the algorithm to converge on an optimal solution and to maximize the time we have to get familiar with the problem domain.

### VC
Github

### Dev Methodology
We will be using the Agile methodology with 2 week long sprints.
Since we won't be able to meet every day, we will be using Slack to post our status and ask any questions of each other in place of a daily Stand Up.
We will meet once a week in person, with every other meeting being a Retrospective to decide how we can improve for the next sprint.

### Collaboration Tool
We have setup a Slack chanel for this project.

### Architecture

We will be using Google's tensorflow neural network library to learn an AI to play tetris, which will be done using Python.
MySQL will be used for the backend database to store high scores.
We will use Elm as our front end language and Elm-UI as the front end framework.
This will be the implementation language for our tetris game and the runner of the neural network sent from the server.
For the server, we will use Python and the Flask framework.
We will use it's built in development server as opposed to adding on a standalone application like Apache or NginX.
