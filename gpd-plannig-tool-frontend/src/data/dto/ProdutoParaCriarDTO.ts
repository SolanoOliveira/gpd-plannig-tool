import { TemplateDTO } from './TemplateDTO';

type ProdutoParaCriarDTO = {
  id: string;
  nome: string;
  data_sa: string;
  lider_npi: string;
  template: TemplateDTO;
};

export { ProdutoParaCriarDTO };
