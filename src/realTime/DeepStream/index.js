export const onSubscribe = (
  client,
  recordName,
  onChange,
  triggerNow = false
) => {
  const record = client.record.getRecord(recordName);
  record.subscribe(data => {
    onChange(data);
  }, triggerNow);
  return record;
};

export const unSubscribe = record => {
  if(record)record.unsubscribe();
};

export const discard = record => {
  record.discard();
};

export const onWhenReady = (client, recordName, onChange) => {
  const record = client.record.getRecord(recordName);

  if (!record) return;
  record.whenReady(data => {
    onChange(data);
  });
};

export const unSubscribeNotification = (client, recordName) => {
  const record = client.record.getRecord(recordName);
  if (!record) return;
  record.unsubscribe();
};

export const onListChenge = (client, List, onChange, action) => {
  const list = client.record.getList(List);
  list.on(action, async x => {
    const record = client.record.getRecord(x);
    record.whenReady(reco => {
      const data = reco.get();

      onChange(data);
      record.discard();
    });
  });

  return list;
};

export const onEventSubscribe = (client, eventPath, onReceiptData) => {
  client.event.subscribe(eventPath, onReceiptData);
};

export const onEventUnSubscribe = (client, eventPath) => {
  client.event.unsubscribe(eventPath);
};

export const onEmit = (client, eventPath, data) => {
  client.event.emit(eventPath, data);
};

export const  presenceSubscribeOfOtherUser=(client, otherUsername,presenceCallback )=>{ 
  client.presence.subscribe(otherUsername,presenceCallback)
}

export const getStatusOfOtherUser=(client, otherUsername,presenceCallback)=>{
  client.presence.getAll([otherUsername],presenceCallback)
}
 
 
export const presenceUnSubscribe=(client)=>{
      client.presence.unsubscribe()
    } 

