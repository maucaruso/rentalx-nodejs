import { inject, injectable } from "tsyringe";

import { RentalsRepository } from "@modules/rentals/infra/typeorm/repositories/RentalsRepository";

@injectable()
class ListRentalsByUserUseCase {
  constructor(
    @inject("RentalsRepository")
    private rentalsRepository: RentalsRepository
  ) {}

  async execute(user_id: string) {
    const rentalsByUser = await this.rentalsRepository.findByUser(user_id);

    return rentalsByUser;
  }
}

export { ListRentalsByUserUseCase };
