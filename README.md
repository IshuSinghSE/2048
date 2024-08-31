[![Netlify Status](https://api.netlify.com/api/v1/badges/236fd0e9-5b49-470a-8f9e-b57e2f89aaca/deploy-status)](https://app.netlify.com/sites/2048retro/deploys)

---

# 2048 Game

A modern web-based implementation of the classic 2048 puzzle game. This version includes responsive touch controls, smooth animations, local storage for saving progress, and a sleek UI.

## Table of Contents

- [Features](#features)
- [Demo](#demo)
- [Installation](#installation)
- [How to Play](#how-to-play)
- [Controls](#controls)
- [Technologies Used](#technologies-used)
- [Customization](#customization)
- [Contributing](#contributing)
- [License](#license)

## Features

- **Responsive Design:** Optimized for both desktop and mobile devices.
- **Touch Controls:** Fully playable on touch devices like mobile phones and tablets.
- **Local Storage:** Automatically saves the game state, so you can resume where you left off.
- **Smooth Animations:** Includes animations for merging tiles and new tiles appearing.
- **Confetti Celebration:** Enjoy a confetti effect when you win the game.
- **High Score Tracking:** Keeps track of your highest score.
- **Customizable UI:** Easily modify the color scheme and other UI elements via CSS.

## Demo

You can try the game [here](https://2048retro.netlify.app).

## Installation

1. Clone the repository:

    ```bash
    git clone https://github.com/yourusername/2048-game.git
    ```

2. Navigate to the project directory:

    ```bash
    cd 2048-game
    ```

3. Open the `index.html` file in your web browser to start playing.

    ```bash
    open index.html
    ```

## How to Play

- **Objective:** Combine tiles with the same number to reach the 2048 tile.
- **Gameplay:** Use arrow keys or swipe gestures (on touch devices) to move tiles. When two tiles with the same number touch, they merge into one.

## Controls

- **Keyboard:**
  - Arrow keys (Up, Down, Left, Right) to move the tiles.
- **Touch Devices:**
  - Swipe in any direction to move the tiles.

## Technologies Used

- **HTML5:** Structure of the web page.
- **CSS3:** Custom styles and animations.
- **JavaScript (ES6):** Core game logic and DOM manipulation.
- **LocalStorage:** Save and load game state and scores.

## Customization

You can customize the look and feel of the game by editing the CSS variables in the `style.css` file. For example:

```css
:root {
  --primary-color: #faf8ef;
  --box-clr-1: #eee4da;
  --box-clr-2: #ede0c8;
  --box-clr-3: #f2b179;
  --box-clr-4: #f59563;
  --box-text-1: #776e65;
  --box-text-2: #f9f6f2;
}
```

## Contributing

Contributions are welcome! Please open an issue or submit a pull request for any features, bug fixes, or improvements.

1. Fork the repository.
2. Create a new branch for your feature:

    ```bash
    git checkout -b feature-name
    ```

3. Commit your changes:

    ```bash
    git commit -m "Add new feature"
    ```

4. Push to your branch:

    ```bash
    git push origin feature-name
    ```

5. Open a pull request on GitHub.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for more information.

---

This `README.md` should cover all aspects of your project and provide a professional presentation. You can customize the content as needed for your specific implementation and include a link to the live demo if you decide to host the game online.
