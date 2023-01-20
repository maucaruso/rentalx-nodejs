import { CarsRepositoryInMemory } from "@modules/cars/repositories/in-memory/CarsRepositoryInMemory";
import { AppError } from "@shared/errors/AppError";

import { CreateCarUseCase } from "./CreateCarUseCase";

let createCarUseCase: CreateCarUseCase;
let carsRepositoryInMemory: CarsRepositoryInMemory;

describe("Create Car", () => {
  beforeEach(() => {
    carsRepositoryInMemory = new CarsRepositoryInMemory();
    createCarUseCase = new CreateCarUseCase(carsRepositoryInMemory);
  });

  it("Sould be able to create a new  car", async () => {
    const car = await createCarUseCase.execute({
      brand: "Brand",
      category_id: "category",
      daily_rate: 100,
      description: "Description car",
      fine_amount: 60,
      license_plate: "ABC-1234",
      name: "Name Car",
    });

    expect(car).toHaveProperty("id");
  });

  it("Should not be able to create a car with exists license plate", async () => {
    await createCarUseCase.execute({
      brand: "Car 1",
      category_id: "category",
      daily_rate: 100,
      description: "Description car",
      fine_amount: 60,
      license_plate: "ABC-1234",
      name: "Name Car",
    });

    await expect(
      createCarUseCase.execute({
        brand: "Car 2",
        category_id: "category",
        daily_rate: 100,
        description: "Description car",
        fine_amount: 60,
        license_plate: "ABC-1234",
        name: "Name Car",
      })
    ).rejects.toEqual(new AppError("Car already exists!"));
  });

  it("Should not be able to create a car with available true by default", async () => {
    const car = await createCarUseCase.execute({
      brand: "Car Available",
      category_id: "category",
      daily_rate: 100,
      description: "Description car",
      fine_amount: 60,
      license_plate: "ABCD-1234",
      name: "Name Car",
    });

    expect(car.available).toBe(true);
  });
});
