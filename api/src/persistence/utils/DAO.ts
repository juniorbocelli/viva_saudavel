interface DAO<T, K> {
  save: (entity: T) => void;
  update: (entity: T) => void;
  saveOrUpdate: (entity: T) => void;
  saveOrUpdateWithReturnId: (entity: T) => Promise<K>;
  delete: (key: K) => void;
  select: (key: K) => Promise<T | null>;
  selectAll: () => Promise<Array<T>>;
  // https://mongoosejs.com/docs/api.html#model_Model.find
  selectBy: (query: Object) => Promise<Array<T>>;
};

export default DAO;