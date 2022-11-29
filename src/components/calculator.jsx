import React, { useState, useEffect } from 'react';
import ButtonsContainer from './buttonsContainer';
import Container from './container';
import Screen from './screen';
import Button from './button';

const btnValues = [
    ["(", ")", "x²", "x³", "x^ⁿ", "⌫"],
    ["sin", "cos", "tan", "√", "³√", "AC"],
    [1, 2, 3, "/", "%", "ln"],
    [4, 5, 6, "x", "e", "log"],
    [7, 8, 9, "-", "MR", "="],
    [".", 0, "π", "+", "MC"],
  ];

const operationMap = {
    "sin(": "Math.sin(",
    "cos(": "Math.cos(",
    "tan(": "Math.tan(",
    "log(": "Math.log10(",
    "ln(": "Math.log(",
    "√(": "Math.sqrt(",
    "³√(": "Math.cbrt(",
    "x²": "**2",
    "x³": "**3",
    "x^ⁿ": "**",
    "!": "",
    "π": "Math.PI",
    "e": "Math.E",
    "%": "/100",
};

const Calculator = () => {

    const [calculation, setCalculation] = useState(["0"]);
    const [operationList, setOperationList] = useState(["0"]);
    const [result, setResult] = useState("");
    const [memory, setMemory] = useState("");

    useEffect(() => {
            let tempResult = "";
            try {
                tempResult = eval([...operationList].join("") === "0" ? "" : [...operationList].join(""));
            } catch(err) {
                tempResult = ""
            }
            setResult(tempResult);
    }, [operationList]);

    const numClickHandler = (e) => {
        e.preventDefault();
        const value = e.target.innerHTML;
        
        if (calculation.length < 20){
            let tempCalculation = [...calculation];
            [...calculation].join("") === "0" ? tempCalculation = [value] : tempCalculation.push(value)
            setCalculation(tempCalculation);

            let tempOperationList = [...operationList];
            [...operationList].join("") === "0" ? tempOperationList = [value] : tempOperationList.push(value)
            setOperationList(tempOperationList);
        }
    };
    
    const commaClickHandler = (e) => {
        e.preventDefault();
        const value = e.target.innerHTML;

        let tempCalculation = [...calculation];
        let tempOPerationList = [...operationList];
        if(![...calculation].join("").includes(".")) {
            tempCalculation.push(value);
            tempOPerationList.push(value);
        }
        setCalculation(tempCalculation);
        setOperationList(tempOPerationList);
        
    }

    const operatorClickHandler = (e) => {
        e.preventDefault();
        const value = e.target.innerHTML;

        let tempCalculation = [...calculation];
        ["+","-",'/',"x"].includes(tempCalculation.slice(-1).toString())
        ? tempCalculation.splice(-1, 1, value)
        : tempCalculation.push(value)
        setCalculation(tempCalculation);

        let tempValue = value;
        if (value === "x") {
            tempValue = "*"
        }
        let tempOperatoinList = [...operationList];
        ["+","-",'/',"*"].includes(tempOperatoinList.slice(-1).toString())
        ? tempOperatoinList.splice(-1, 1, tempValue)
        : tempOperatoinList.push(tempValue)
        setOperationList(tempOperatoinList);
    }

    const resetClickHandler = (e) => {
        e.preventDefault();
        
        setCalculation(["0"]);
        setResult("");
        setOperationList("0")
    }

    const delClickHandler = (e) => {
        e.preventDefault();

        setCalculation(
            calculation.length === 1
            ? "0"
            : calculation.slice(0, -1)
        );

        setOperationList(
            operationList.length === 1
            ? "0"
            : operationList.slice(0, -1)
        );

        if (calculation.length === 1) {
            setResult("");
        }
    }

    const mathFunctionClickHandler = (e) => {
        e.preventDefault();
        const value = e.target.innerHTML;
        let tempValue = value + "(";

        if (value === "%"){
            tempValue = value;
        }

        let tempCalculation = [...calculation];
        [...calculation].join("") === "0" ? tempCalculation = [tempValue] : tempCalculation.push(tempValue);
        setCalculation(tempCalculation);

        let tempOPerationList = [...operationList];
        [...operationList].join("") === "0" ? tempOPerationList = [operationMap[tempValue]] : tempOPerationList.push(operationMap[tempValue]);
        setOperationList(tempOPerationList);
    }
    
    const powerClickHandler = (e) => {
        e.preventDefault();
        const value = e.target.innerHTML;
        let tempValue = value.slice(1, 2);
    
        let tempCalculation = [...calculation];
        tempCalculation.push(tempValue);
        setCalculation(tempCalculation);

        let tempOPerationList = [...operationList];
        tempOPerationList.push(operationMap[value]);
        setOperationList(tempOPerationList);
    }

    const constClickHandler = (e) => {
        e.preventDefault();
        const value = e.target.innerHTML;

        let tempCalculation = [...calculation];
        [...calculation].join("") === "0" ? tempCalculation = [value] : tempCalculation.push(value);
        setCalculation(tempCalculation);

        let tempOPerationList = [...operationList];
        [...operationList].join("") === "0" ? tempOPerationList = [operationMap[value]] : tempOPerationList.push(operationMap[value]);
        setOperationList(tempOPerationList);
    }

    const mrClickHandler = (e) => {
        e.preventDefault();
        
        if (memory !== ""){
            let tempCalculation = [...calculation];
            [...calculation].join("") === "0" ? tempCalculation = [memory] : tempCalculation.push(memory);
            setCalculation(tempCalculation);

            let tempOPerationList = [...operationList];
            [...operationList].join("") === "0" ? tempOPerationList = [memory] : tempOPerationList.push(memory);
            setOperationList(tempOPerationList);
        }

        if (memory === ""){
            setMemory(result);
        }
        
    }

    const mcClickHandler = (e) => {
        e.preventDefault();  
        
        setMemory("");
    }

    const equalsClickHandler = (e) => {
        e.preventDefault();

        if (result !== "") {
            let tempCalculation = [...result.toString()];
            setCalculation(tempCalculation);
            setOperationList(tempCalculation);
        }
    }

    return (
        <Container>
          <Screen calculation={calculation} result={result}/>
            <ButtonsContainer>
            {
                btnValues.flat().map((btn, i) => {
                    return (
                        <Button
                          key={i}
                          className={btn === "=" 
                                    ? "equals" 
                                    : btn === "MC" || btn === "MR"
                                    ? "memory"
                                    : btn === "AC" || btn === "⌫"
                                    ? "del"
                                    : ""}
                          value={btn}
                          onClick={
                            btn === "AC"
                                ? resetClickHandler
                                : btn === "="
                                ? equalsClickHandler
                                : btn === "/" || btn === "x" || btn === "-" || btn === "+"
                                ? operatorClickHandler
                                : btn === "."
                                ? commaClickHandler
                                : btn === "⌫"
                                ? delClickHandler
                                : btn === "log" || btn === "ln" || btn === "sin" || btn === "cos"|| btn === "tan" || btn === "³√" || btn === "√" || btn === "%"
                                ? mathFunctionClickHandler
                                : btn === "x²" || btn === "x³" || btn ==="x^ⁿ"
                                ? powerClickHandler
                                : btn === "π" || btn === "e"
                                ? constClickHandler
                                : btn === "MC"
                                ? mcClickHandler
                                : btn === "MR"
                                ? mrClickHandler
                                : numClickHandler
                          }
                        />
                    );
                })
            }
            </ButtonsContainer>
        </Container>
    );
}

export default Calculator;
