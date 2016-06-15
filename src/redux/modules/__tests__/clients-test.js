import { expect } from 'chai';

import * as clientsModule from '../clients';
import * as mocks from './mocks';

describe('(Clients Redux Module)', () => {
  describe('Actions', () => {
    it('return promise creator for clients#load method and resolve it with given data', () => {
      // prepare
      const mockClient = { get: () => Promise.resolve(mocks.clients)};
      const mockState = { };
      const expectedTypes = [clientsModule.LOAD, clientsModule.LOAD_SUCCESS, clientsModule.LOAD_FAIL];
      const action = clientsModule.load();

      // execute
      const promise = action.promise(mockClient, () => mockState);

      // asserts
      expect(promise).to.be.an.instanceof(Promise);
      return promise.then((res) => {
        expect(res).to.be.eql(mocks.clients);
      });
    });
  });

  describe('Reducers', () => {
    const reducer = clientsModule.default;
    it('return state with loading flag', () => {
      // prepare
      const expected = {
        ...clientsModule.initialState,
        loading: true
      };
      // execute
      const state = reducer(clientsModule.initialState, {type: clientsModule.LOAD});
      // asserts
      expect(state).to.be.eql(expected);
    });

    it('return state with error data on LOAD_FAIL', () => {
      // prepare
      const expected = {
        ...clientsModule.initialState,
        loading: false,
        loaded: false,
        clients: null,
        error: 'test error',
      };
      // execute
      const state = reducer(clientsModule.initialState, {type: clientsModule.LOAD_FAIL, error: 'test error'});
      // asserts
      expect(state).to.be.eql(expected);
    });

    it('return state with correct clients list on LOAD_SUCCESS', () => {
      // prepare
      const expected = {
        ...clientsModule.initialState,
        loading: false,
        loaded: true,
        error: null,
        clients: mocks.clients,
      };
      // execute
      const state = reducer(clientsModule.initialState, {type: clientsModule.LOAD_SUCCESS, payload: mocks.clients});
      // asserts
      expect(state).to.be.eql(expected);
    });
  });
});
