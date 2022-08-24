import counter_reducer, {
  confirm,
} from './document_slice';

describe('counter reducer', () => {
  const initialState = {
    content: "",
    status: "ready"
  };
  it('should handle initial state', () => {
    expect(counter_reducer(undefined, { type: 'unknown' })).toEqual({
      content: "",
      status: 'ready',
    });
  });

  it('should handle a successful upload', () => {
    const actual = counter_reducer(initialState, confirm("Hello World"));
    expect(actual.content).toEqual("Hello World");
    expect(actual.status).toEqual("Success");
  });

});
