# Calculator

A simple browser calculator built with **HTML, CSS, and JavaScript**.

It supports basic calculations, decimals, percentages, negative values, backspace, active operator highlighting, and keyboard input.

## Project Structure

```text
JS2-calculator/
│
├── index.html
├── style.css
└── js2/
    └── script.js
```

> Important: The JavaScript file path in `index.html` must match the real folder name.

```html
<script src="./js2/script.js"></script>
```

If your folder is named `JS` instead of `js2`, use:

```html
<script src="./JS/script.js"></script>
```

## How to Run the Project

No installation, Node.js, or server setup is required.

1. Open the project folder in VS Code.
2. Make sure the files are arranged as shown above.
3. Open `index.html` in a browser.

You can also use the VS Code **Live Server** extension:

1. Install the **Live Server** extension.
2. Right-click `index.html`.
3. Select **Open with Live Server**.

The calculator will open in your browser.

## Features

* Addition
* Subtraction
* Multiplication
* Division
* Decimal numbers
* Percentage conversion
* Positive/negative number toggle
* Backspace button
* Clear button
* Division-by-zero message
* Maximum digit limit
* Scientific notation for very large results
* Operator highlighting
* Chained calculations
* Keyboard support

## Calculator Buttons

| Button | Function                                                           |
| ------ | ------------------------------------------------------------------ |
| `AC`   | Clears the calculator                                              |
| `⌫`    | Deletes the last digit                                             |
| `+/-`  | Changes a number from positive to negative or negative to positive |
| `%`    | Converts the displayed number into a percentage                    |
| `.`    | Adds a decimal point                                               |
| `+`    | Addition                                                           |
| `-`    | Subtraction                                                        |
| `*`    | Multiplication                                                     |
| `/`    | Division                                                           |
| `=`    | Calculates the result                                              |

## Keyboard Support

| Keyboard Key   | Function              |
| -------------- | --------------------- |
| `0`–`9`        | Enter numbers         |
| `.`            | Add decimal point     |
| `+`            | Addition              |
| `-`            | Subtraction           |
| `*`            | Multiplication        |
| `/`            | Division              |
| `Enter` or `=` | Calculate result      |
| `Backspace`    | Delete last digit     |
| `C`            | Clear calculator      |
| `%`            | Convert to percentage |

## JavaScript Functionality

The calculator uses the following main functions:

* `add(a, b)` — adds two values
* `subtract(a, b)` — subtracts two values
* `multiply(a, b)` — multiplies two values
* `divide(a, b)` — divides two values and handles division by zero
* `operate(operator, a, b)` — selects the correct math operation
* `appendNumber(number)` — adds numbers to the display
* `appendDecimal()` — adds one decimal point
* `setOperator(operator)` — saves and highlights the selected operator
* `calculateResult()` — calculates and displays the result
* `clearCalculator()` — resets the calculator
* `backspace()` — removes the last character
* `toggleSign()` — changes the number sign
* `convertPercent()` — divides the displayed value by 100

## Division by Zero

When a user tries to divide by zero, the calculator displays:

```text
Nice try
```

## Technologies Used

* HTML5
* CSS3
* Vanilla JavaScript
* Font Awesome CDN

## Author

Created as a JavaScript calculator practice project.
