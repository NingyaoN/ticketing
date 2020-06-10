import { Message } from 'node-nats-streaming';
import mongoose from 'mongoose';
import { TicketCreatedEvent } from '@nntickets/common';
import { TicketCreatedListener } from '../ticket-created-listener';
import { natsWrapper } from '../../../nats-wrapper';
import { Ticket } from '../../../models/ticket';

const setup = async () => {
  /**
   * Create an instance of the listener
   */

  const listener = new TicketCreatedListener(natsWrapper.client);
  /**
   * create a fake data event
   */

  const data: TicketCreatedEvent['data'] = {
    version: 0,
    id: new mongoose.Types.ObjectId().toHexString(),
    title: 'concert',
    price: 10,
    userId: new mongoose.Types.ObjectId().toHexString(),
  };
  /**
   * create a fake message object
   */
  // @ts-ignore
  const msg: Message = {
    ack: jest.fn(),
  };

  return { listener, data, msg };
};

it('creates and saves a ticket', async () => {
  /**
   * call the onMessage function with the data object + message object
   */

  const { listener, data, msg } = await setup();
  await listener.onMessage(data, msg);
  //await listener.onMessage(data, msg as Message);

  /**
   * Write assertions to make sure a ticket was created
   */

  const ticket = await Ticket.findById(data.id);

  expect(ticket).toBeDefined();
  expect(ticket!.title).toEqual(data.title);
  expect(ticket!.price).toEqual(data.price);
});

it('acks the messsage', async () => {
  const { listener, data, msg } = await setup();
  /**
   * call the onMessage function with the data object + message object
   */
  await listener.onMessage(data, msg);
  /**
   * Write assertions to make sure a ticket was created
   */

  expect(msg.ack).toHaveBeenCalled();
});
