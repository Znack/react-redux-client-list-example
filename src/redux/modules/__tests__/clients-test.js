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

    it('return simple search query with clients#search method', () => {
      // execute
      const action = clientsModule.search('test query');

      // asserts
      expect(action).to.be.eql({ type: clientsModule.SEARCH, payload: {query: 'test query'} });
    });

    it('return simple index of chosen client with clients#choose method', () => {
      // execute
      const action = clientsModule.choose(3);

      // asserts
      expect(action).to.be.eql({ type: clientsModule.CHOOSE, payload: {index: 3} });
    });
  });

  describe('Reducers', () => {
    const reducer = clientsModule.default;

    describe('LOAD, LOAD_FAIL and LOAD_SUCCESS reducers', () => {
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

    describe('SEARCH reducer', () => {
      it('return state with changed `query` property', () => {
        // prepare
        const expected = {
          ...clientsModule.initialState,
          searchQuery: 'test query',
        };
        // execute
        const state = reducer(clientsModule.initialState, {type: clientsModule.SEARCH, payload: {query: 'test query'} });
        // asserts
        expect(state).to.be.eql(expected);
      });
    });

    describe('CHOOSE reducer', () => {
      it('return state with changed `chosen` property', () => {
        // prepare
        const expected = {
          ...clientsModule.initialState,
          chosen: 2,
        };
        // execute
        const state = reducer(clientsModule.initialState, {type: clientsModule.CHOOSE, payload: {index: 2} });
        // asserts
        expect(state).to.be.eql(expected);
      });
    });
  });
});
