/// <reference types="node" />
// В.1 Структура коду
import { test } from 'node:test';
import { strictEqual } from 'node:assert';

interface Dish {
  name: string;
  price: number;
}

class Order {
  public readonly dish: Dish;
  public readonly quantity: number;

  constructor(dish: Dish, quantity: number) {
    this.dish = dish;
    this.quantity = quantity;
  }

  getTotal(): number {
    return this.dish.price * this.quantity;
  }
}

const dish: Dish = { name: 'Паста', price: 150 };
const order = new Order(dish, 3);

console.log(order.getTotal()); 

// В.2 Форматування коду

function totalBefore(price:number,quantity:number):number{
const total=price*quantity;
if(quantity<=0){return 0;}
return total;
}

function totalAfter(price: number, quantity: number): number {
  const total = price * quantity;

  if (quantity <= 0) {
    return 0;
  }

  return total;
}

console.log(totalBefore(150, 3)); 
console.log(totalAfter(150, 3));  

// В.3 Іменування та іменовані константи
function calc(a: number, b: number): number {
  const x = a * b;
  return x > 1000 ? x * 0.9 : x;
}

const DISCOUNT_THRESHOLD = 1000;
const DISCOUNT_RATE = 0.1;

function calculateDiscountedTotal(price: number,quantity: number): number {
  const total = price * quantity;
  const hasDiscount = total > DISCOUNT_THRESHOLD;

  return hasDiscount ? total * (1 - DISCOUNT_RATE) : total;
}

console.log(calc(150, 8));                     
console.log(calculateDiscountedTotal(150, 8));

// В.4 Коментарі

let portionCount = 2;

// Збільшуємо кількість порцій на одиницю. - поганий коментар
portionCount++;

function getDeliveryQuantity(quantity: number): number {
  // Сервіс доставки приймає замовлення лише на цілі порції.
  return Math.ceil(quantity);
}

console.log(portionCount);
console.log(getDeliveryQuantity(2.5));

// В.5 Документування коду

/**
 * Обчислює вартість порцій без доставки та знижок.
 * @param dish Страва з ціною за одну порцію у гривнях.
 * @param quantity Кількість замовлених порцій.
 * @returns Загальна вартість у гривнях.
 * @example
 * calculateTotal({ name: 'Паста', price: 150 }, 3); // 450
 */
function calculateTotal(dish: Dish, quantity: number): number {
  return dish.price * quantity;
}

console.log(calculateTotal(dish, 3));

// В.6 Конвенції TypeScript

function createOrderSummary(selectedDish: Dish, quantity: number): string {
  const total = calculateTotal(selectedDish, quantity);

  return `${selectedDish.name}: ${quantity} порції, ${total} грн`;
}

function demonstrateConventions(): void {
  const selectedDish: Dish = { name: 'Паста', price: 150 };
  let selectedQuantity = 2;

  selectedQuantity += 1;

  const summary = createOrderSummary(selectedDish, selectedQuantity);
  console.log(summary);
}

demonstrateConventions();

// В.7 Тестування

test('calculateTotal повертає 450 для трьох порцій по 150', () => {
  // Arrange
  const selectedDish: Dish = { name: 'Паста', price: 150 };

  // Act
  const actual = calculateTotal(selectedDish, 3);

  // Assert
  strictEqual(actual, 450);
});

//node --test --test-reporter=spec main.ts

// В.8 Автоматичні перевірки

// npx tsc main.ts --noEmit --strict --target ES2022 --module nodenext
// npx eslint main.ts
// npx prettier main.ts --check
// node --test --test-reporter=spec main.ts

