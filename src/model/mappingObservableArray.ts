import {reaction} from 'mobx';
import {IArrayChange, IArraySplice, IObservableArray} from 'mobx';

type TConstructor<T> = new (...args: any[]) => T;

interface IObserveAndMapArrayParams {
	from: [any, string];
	to: [any, string];
	MapConstructor: TConstructor<any>;
}

export default function mappingObservableArray({from, to, MapConstructor}: IObserveAndMapArrayParams) {
	const getSourceArray = () => from[0][from[1]] as any[];
	const getDestinationArray = () => to[0][to[1]] as any[];
	const setDestinationArray = (value: any) => to[0][to[1]] = value;

	reaction(() => getSourceArray(), onSourceArrayReplace);
	sourceArrayObserve();

	function onSourceArrayReplace() {
		setDestinationArray(getSourceArray().map(item => new MapConstructor(item)));
		sourceArrayObserve();
	}

	function sourceArrayObserve() {
		(getSourceArray() as unknown as IObservableArray<any>).observe(onSourceArraySpliceOrUpdate);
	}

	function onSourceArraySpliceOrUpdate(changeData: IArrayChange<any> | IArraySplice<any>) {
		switch (changeData.type) {
			case 'splice':
				getDestinationArray().splice(
					changeData.index,
					changeData.removedCount,
					...changeData.added.map(item => new MapConstructor(item))
				);
				break;
			case 'update':
				getDestinationArray()[changeData.index] = new MapConstructor(changeData.newValue);
				break;
		}
		return changeData;
	}
}

