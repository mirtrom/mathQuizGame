
import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity } from 'react-native';
import { Provider as PaperProvider } from 'react-native-paper';

const generateRandomExpression = () => {
  const operators = ['+', '-', '*'];
  const randomOperator = operators[Math.floor(Math.random() * operators.length)];
  const num1 = Math.floor(Math.random() * 10) + 1;
  const num2 = Math.floor(Math.random() * 10) + 1;

  return {
    expression: `${num1} ${randomOperator} ${num2}`,
    answer: eval(`${num1} ${randomOperator} ${num2}`),
  };
};

const MathGame = () => {
  const [currentExpression, setCurrentExpression] = useState(generateRandomExpression());
  const [userAnswer, setUserAnswer] = useState('');
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(30); // 30 seconds timer
  const [isGameOver, setIsGameOver] = useState(false);

  useEffect(() => {
    if (timeLeft > 0) {
      const timer = setInterval(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearInterval(timer);
    } else {
      setIsGameOver(true);
    }
  }, [timeLeft]);

  const handleAnswerSubmit = () => {
    if (parseInt(userAnswer) === currentExpression.answer) {
      setScore(score + 1);
      setCurrentExpression(generateRandomExpression());
      setUserAnswer('');
    } else {
      alert('Неправильна відповідь! Спробуйте ще раз.');
    }
  };

  const resetGame = () => {
    setScore(0);
    setTimeLeft(30);
    setIsGameOver(false);
    setCurrentExpression(generateRandomExpression());
    setUserAnswer('');
  };

  return (
    <PaperProvider>
      <View style={styles.container}>
        {isGameOver ? (
          <View style={styles.gameOverContainer}>
            <Text style={styles.gameOverText}>Гра завершена!</Text>
            <Text style={styles.scoreText}>Ваш рахунок: {score}</Text>
            <TouchableOpacity style={styles.button} onPress={resetGame}>
              <Text style={styles.buttonText}>Грати знову</Text>
            </TouchableOpacity>
          </View>
        ) : (
          <View style={styles.gameContainer}>
            <Text style={styles.expressionText}>{currentExpression.expression}</Text>
            <TextInput
              style={styles.input}
              keyboardType="numeric"
              value={userAnswer}
              onChangeText={setUserAnswer}
              placeholder="Введіть відповідь"
              placeholderTextColor="#999"
            />
            <TouchableOpacity style={styles.button} onPress={handleAnswerSubmit}>
              <Text style={styles.buttonText}>Перевірити</Text>
            </TouchableOpacity>
            <Text style={styles.scoreText}>Рахунок: {score}</Text>
            <Text style={styles.timerText}>Залишилось часу: {timeLeft} сек</Text>
          </View>
        )}
      </View>
    </PaperProvider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#121212', // Темний фон
  },
  gameContainer: {
    alignItems: 'center',
    backgroundColor: '#1E1E1E', // Темний колір фону для контенту
    padding: 20,
    borderRadius: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  expressionText: {
    fontSize: 36,
    marginBottom: 20,
    textAlign: 'center',
    color: '#FFFFFF', // Білий текст
  },
  input: {
    height: 50,
    borderColor: '#333', // Темний колір бордюра
    borderWidth: 2,
    borderRadius: 10,
    marginBottom: 20,
    paddingHorizontal: 12,
    width: 200,
    textAlign: 'center',
    backgroundColor: '#2A2A2A', // Темне поле введення
    color: '#FFFFFF', // Білий текст у полі введення
  },
  scoreText: {
    fontSize: 24,
    marginVertical: 16,
    color: '#FFFFFF', // Білий текст
  },
  timerText: {
    fontSize: 24,
    color: '#FF5252', // Червоний колір для таймера
    marginTop: 10,
  },
  gameOverContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#1E1E1E', // Темний колір фону для "Гра завершена"
    padding: 30,
    borderRadius: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  gameOverText: {
    fontSize: 32,
    marginBottom: 16,
    color: '#FF5252', // Червоний колір для "Гра завершена"
    textAlign: 'center',
  },
  button: {
    backgroundColor: '#6200EE', // Фіолетовий колір кнопки
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 10,
    marginTop: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 4,
  },
  buttonText: {
    color: '#FFFFFF', // Білий текст на кнопці
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default MathGame;
