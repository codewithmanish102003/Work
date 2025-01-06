document.addEventListener('DOMContentLoaded', () => {
    let input = document.getElementById('inputBox');
    let buttons = document.querySelectorAll('button');

    let string = "";

    const calculate = () => {
        try {
            string = eval(string);
            input.value = string;
        } catch {
            input.value = "Error";
            string = "";
        }
    };

    const Square = () => {
        string = eval(string * string)
        input.value = string
    }

    const Cube = () => {
        string = eval(string * string * string)
        input.value = string
    }


    const Round = () => {
        string = eval(Math.round(string))
        input.value = string
    }



    const Percentage = () => {
        string = eval((string/100)*100)
        input.value = string
    }

    const clearInput = () => {
        string = "";
        input.value = string;
    };

    const updateInput = (value) => {
        string += value;
        input.value = string;
    };



    buttons.forEach(button => {
        button.addEventListener('click', (event) => {
            let value = event.target.innerHTML;

            if (value === '=') {
                calculate();
            }  else if (value === "Del") {
                string=string.substring(0,string.length-1)
                input.value=string
            }else if (value === 'AC') {
                clearInput();
            }
            else if (value === "Sqr") {
                Square()
            }
            else if (value === "Cub") {
                Cube()
            }
            else if (value === '%') {
                Percentage();
            }
            else if (value === 'Rnd') {
                Round();
            }
            else {
                updateInput(value);
            }
        });
    });

    document.addEventListener('keydown', (event) => {
        let key = event.key;

        if (!isNaN(key) || ['+', '-', '*', '/', '.', '(', ')', '%'].includes(key)) {
            updateInput(key);
        } else if (key === 'Enter') {
            calculate();
        } else if (key === 'Backspace') {
            string = string.slice(0, -1);
            input.value = string;
        } else if (key === 'Escape') {
            clearInput();
        }
    });
});

