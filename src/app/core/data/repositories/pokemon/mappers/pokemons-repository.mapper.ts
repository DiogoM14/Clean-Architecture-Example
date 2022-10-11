import { Mapper } from '../../../../base/utils/mapper';
import { PokemonsEntity } from '../entities/pokemons-entity';
import { PokemonsModel } from '../../../../domain/models/pokemons.model';

export class PokemonImplementationRepositoryMapper extends Mapper<
  PokemonsEntity,
  PokemonsModel
> {
  mapFrom(param: PokemonsEntity): PokemonsModel {
    console.log(param);
    return {
      name: param.results[0].name,
      url: param.results[0].url,
    };
  }

  mapTo(param: PokemonsModel): any {
    return {};
  }
}
