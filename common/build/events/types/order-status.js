"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var OrderStatus;
(function (OrderStatus) {
    /**
     * When the order has been created, but the ticket it is trying
     * to order has not been reserved.
     */
    OrderStatus["Created"] = "created";
    /**
     * the ticket the order is trying to reserve has already
     * been reserved, or when the user has cancelled the order.
     */
    OrderStatus["Cancelled"] = "cancelled";
    /**
     * The order has successfully reserved the ticket
     */
    OrderStatus["AwaitingPayment"] = "awaiting:payment";
    /**
     * the order has reserved the ticket a[nd the user has
     * provided payment successfully
     */
    OrderStatus["Complete"] = "complete";
})(OrderStatus = exports.OrderStatus || (exports.OrderStatus = {}));
