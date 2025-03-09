export class UI_ENDPOINTS {
    static AUTH = '/auth/login';
    static CUSTOMER = '/customer';
    static ORDERS_OPEN = `${this.CUSTOMER}/orders/open`;
    static ORDERS_DRAFT = `${this.CUSTOMER}/orders/draft`;
    static NEW_ORDER = `${this.CUSTOMER}/draft/new`;

    static draftById(orderId: string) {
        return `${this.CUSTOMER}/draft/${orderId}`;
    }
}
