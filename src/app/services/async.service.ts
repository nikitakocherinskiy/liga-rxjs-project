import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AsyncService {
  constructor() {}

  // Задание №2
  sumArrayElements(arr: number[]): Promise<number> {
    return new Promise((resolve) => {
      setTimeout(() => {
        const sum = arr.reduce((acc, curr) => acc + curr, 0);
        resolve(sum);
      }, 2000);
    });
  }

  // Пример использования
  // const array = [1, 2, 3, 4, 5];
  // sumArrayElements(array)
  //   .then((result) => {
  //     console.log("Сумма элементов массива:", result);
  //   })
  //   .catch((error) => {
  //     console.error("Произошла ошибка:", error);
  //   });
}
