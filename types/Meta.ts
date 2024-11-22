export default interface Meta {
  pagination?: {
    total: number;
    count: number;
    per_page: number;
    current_page: number;
    total_pages: number;
  };
  is_fetching: boolean;
}
