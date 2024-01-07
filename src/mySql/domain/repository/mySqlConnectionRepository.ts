export interface mySqlConnectionRepository {
  connect(): Promise<void>;
  execute(query: string, values?: any[]): Promise<any>;
}
