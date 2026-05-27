import * as __typia_transform__assertGuard from "typia/lib/internal/_assertGuard";
import * as __typia_transform__validateReport from "typia/lib/internal/_validateReport";
import * as __typia_transform__createStandardSchema from "typia/lib/internal/_createStandardSchema";
import typia from 'typia';
export const is = (() => { const _io0 = input => "string" === typeof input.string && "number" === typeof input.number && "number" === typeof input.maxNumber && "boolean" === typeof input.boolean && ("object" === typeof input.nested && null !== input.nested && _io1(input.nested)) && "string" === typeof input.longString; const _io1 = input => "string" === typeof input.string && "number" === typeof input.number && "number" === typeof input.minNumber && "boolean" === typeof input.boolean && (Array.isArray(input.deepNumberArray) && input.deepNumberArray.every(elem => "number" === typeof elem)); return input => "object" === typeof input && null !== input && _io0(input); })();
export const equals = (() => { const _io0 = (input, _exceptionable = true) => "string" === typeof input.string && "number" === typeof input.number && "number" === typeof input.maxNumber && "boolean" === typeof input.boolean && ("object" === typeof input.nested && null !== input.nested && _io1(input.nested, true && _exceptionable)) && "string" === typeof input.longString && (6 === Object.keys(input).length || Object.keys(input).every(key => {
    if (["string", "number", "maxNumber", "boolean", "nested", "longString"].some(prop => key === prop))
        return true;
    const value = input[key];
    if (undefined === value)
        return true;
    return false;
})); const _io1 = (input, _exceptionable = true) => "string" === typeof input.string && "number" === typeof input.number && "number" === typeof input.minNumber && "boolean" === typeof input.boolean && (Array.isArray(input.deepNumberArray) && input.deepNumberArray.every((elem, _index1) => "number" === typeof elem)) && (5 === Object.keys(input).length || Object.keys(input).every(key => {
    if (["string", "number", "minNumber", "boolean", "deepNumberArray"].some(prop => key === prop))
        return true;
    const value = input[key];
    if (undefined === value)
        return true;
    return false;
})); return (input, _exceptionable = true) => "object" === typeof input && null !== input && _io0(input, true); })();
export const assert = (() => { const _io0 = input => "string" === typeof input.string && "number" === typeof input.number && "number" === typeof input.maxNumber && "boolean" === typeof input.boolean && ("object" === typeof input.nested && null !== input.nested && _io1(input.nested)) && "string" === typeof input.longString; const _io1 = input => "string" === typeof input.string && "number" === typeof input.number && "number" === typeof input.minNumber && "boolean" === typeof input.boolean && (Array.isArray(input.deepNumberArray) && input.deepNumberArray.every(elem => "number" === typeof elem)); const _ao0 = (input, _path, _exceptionable = true) => ("string" === typeof input.string || __typia_transform__assertGuard._assertGuard(_exceptionable, {
    method: "typia.createAssert",
    path: _path + ".string",
    expected: "string",
    value: input.string
}, _errorFactory)) && ("number" === typeof input.number || __typia_transform__assertGuard._assertGuard(_exceptionable, {
    method: "typia.createAssert",
    path: _path + ".number",
    expected: "number",
    value: input.number
}, _errorFactory)) && ("number" === typeof input.maxNumber || __typia_transform__assertGuard._assertGuard(_exceptionable, {
    method: "typia.createAssert",
    path: _path + ".maxNumber",
    expected: "number",
    value: input.maxNumber
}, _errorFactory)) && ("boolean" === typeof input.boolean || __typia_transform__assertGuard._assertGuard(_exceptionable, {
    method: "typia.createAssert",
    path: _path + ".boolean",
    expected: "boolean",
    value: input.boolean
}, _errorFactory)) && (("object" === typeof input.nested && null !== input.nested || __typia_transform__assertGuard._assertGuard(_exceptionable, {
    method: "typia.createAssert",
    path: _path + ".nested",
    expected: "__type",
    value: input.nested
}, _errorFactory)) && _ao1(input.nested, _path + ".nested", true && _exceptionable) || __typia_transform__assertGuard._assertGuard(_exceptionable, {
    method: "typia.createAssert",
    path: _path + ".nested",
    expected: "__type",
    value: input.nested
}, _errorFactory)) && ("string" === typeof input.longString || __typia_transform__assertGuard._assertGuard(_exceptionable, {
    method: "typia.createAssert",
    path: _path + ".longString",
    expected: "string",
    value: input.longString
}, _errorFactory)); const _ao1 = (input, _path, _exceptionable = true) => ("string" === typeof input.string || __typia_transform__assertGuard._assertGuard(_exceptionable, {
    method: "typia.createAssert",
    path: _path + ".string",
    expected: "string",
    value: input.string
}, _errorFactory)) && ("number" === typeof input.number || __typia_transform__assertGuard._assertGuard(_exceptionable, {
    method: "typia.createAssert",
    path: _path + ".number",
    expected: "number",
    value: input.number
}, _errorFactory)) && ("number" === typeof input.minNumber || __typia_transform__assertGuard._assertGuard(_exceptionable, {
    method: "typia.createAssert",
    path: _path + ".minNumber",
    expected: "number",
    value: input.minNumber
}, _errorFactory)) && ("boolean" === typeof input.boolean || __typia_transform__assertGuard._assertGuard(_exceptionable, {
    method: "typia.createAssert",
    path: _path + ".boolean",
    expected: "boolean",
    value: input.boolean
}, _errorFactory)) && ((Array.isArray(input.deepNumberArray) || __typia_transform__assertGuard._assertGuard(_exceptionable, {
    method: "typia.createAssert",
    path: _path + ".deepNumberArray",
    expected: "Array<number>",
    value: input.deepNumberArray
}, _errorFactory)) && input.deepNumberArray.every((elem, _index2) => "number" === typeof elem || __typia_transform__assertGuard._assertGuard(_exceptionable, {
    method: "typia.createAssert",
    path: _path + ".deepNumberArray[" + _index2 + "]",
    expected: "number",
    value: elem
}, _errorFactory)) || __typia_transform__assertGuard._assertGuard(_exceptionable, {
    method: "typia.createAssert",
    path: _path + ".deepNumberArray",
    expected: "Array<number>",
    value: input.deepNumberArray
}, _errorFactory)); const __is = input => "object" === typeof input && null !== input && _io0(input); let _errorFactory; return (input, errorFactory) => {
    if (false === __is(input)) {
        _errorFactory = errorFactory;
        ((input, _path, _exceptionable = true) => ("object" === typeof input && null !== input || __typia_transform__assertGuard._assertGuard(true, {
            method: "typia.createAssert",
            path: _path + "",
            expected: "ISchema",
            value: input
        }, _errorFactory)) && _ao0(input, _path + "", true) || __typia_transform__assertGuard._assertGuard(true, {
            method: "typia.createAssert",
            path: _path + "",
            expected: "ISchema",
            value: input
        }, _errorFactory))(input, "$input", true);
    }
    return input;
}; })();
export const validate = (() => { const _io0 = input => "string" === typeof input.string && "number" === typeof input.number && "number" === typeof input.maxNumber && "boolean" === typeof input.boolean && ("object" === typeof input.nested && null !== input.nested && _io1(input.nested)) && "string" === typeof input.longString; const _io1 = input => "string" === typeof input.string && "number" === typeof input.number && "number" === typeof input.minNumber && "boolean" === typeof input.boolean && (Array.isArray(input.deepNumberArray) && input.deepNumberArray.every(elem => "number" === typeof elem)); const _vo0 = (input, _path, _exceptionable = true) => ["string" === typeof input.string || _report(_exceptionable, {
        path: _path + ".string",
        expected: "string",
        value: input.string
    }), "number" === typeof input.number || _report(_exceptionable, {
        path: _path + ".number",
        expected: "number",
        value: input.number
    }), "number" === typeof input.maxNumber || _report(_exceptionable, {
        path: _path + ".maxNumber",
        expected: "number",
        value: input.maxNumber
    }), "boolean" === typeof input.boolean || _report(_exceptionable, {
        path: _path + ".boolean",
        expected: "boolean",
        value: input.boolean
    }), ("object" === typeof input.nested && null !== input.nested || _report(_exceptionable, {
        path: _path + ".nested",
        expected: "__type",
        value: input.nested
    })) && _vo1(input.nested, _path + ".nested", true && _exceptionable) || _report(_exceptionable, {
        path: _path + ".nested",
        expected: "__type",
        value: input.nested
    }), "string" === typeof input.longString || _report(_exceptionable, {
        path: _path + ".longString",
        expected: "string",
        value: input.longString
    })].every(flag => flag); const _vo1 = (input, _path, _exceptionable = true) => ["string" === typeof input.string || _report(_exceptionable, {
        path: _path + ".string",
        expected: "string",
        value: input.string
    }), "number" === typeof input.number || _report(_exceptionable, {
        path: _path + ".number",
        expected: "number",
        value: input.number
    }), "number" === typeof input.minNumber || _report(_exceptionable, {
        path: _path + ".minNumber",
        expected: "number",
        value: input.minNumber
    }), "boolean" === typeof input.boolean || _report(_exceptionable, {
        path: _path + ".boolean",
        expected: "boolean",
        value: input.boolean
    }), (Array.isArray(input.deepNumberArray) || _report(_exceptionable, {
        path: _path + ".deepNumberArray",
        expected: "Array<number>",
        value: input.deepNumberArray
    })) && input.deepNumberArray.map((elem, _index2) => "number" === typeof elem || _report(_exceptionable, {
        path: _path + ".deepNumberArray[" + _index2 + "]",
        expected: "number",
        value: elem
    })).every(flag => flag) || _report(_exceptionable, {
        path: _path + ".deepNumberArray",
        expected: "Array<number>",
        value: input.deepNumberArray
    })].every(flag => flag); const __is = input => "object" === typeof input && null !== input && _io0(input); let errors; let _report; return __typia_transform__createStandardSchema._createStandardSchema(input => {
    if (false === __is(input)) {
        errors = [];
        _report = __typia_transform__validateReport._validateReport(errors);
        ((input, _path, _exceptionable = true) => ("object" === typeof input && null !== input || _report(true, {
            path: _path + "",
            expected: "ISchema",
            value: input
        })) && _vo0(input, _path + "", true) || _report(true, {
            path: _path + "",
            expected: "ISchema",
            value: input
        }))(input, "$input", true);
        const success = 0 === errors.length;
        return success ? {
            success,
            data: input
        } : {
            success,
            errors,
            data: input
        };
    }
    return {
        success: true,
        data: input
    };
}); })();
export const clone = (() => { const _cp0 = input => input.map(elem => elem); const _co0 = input => ({
    string: input.string,
    number: input.number,
    maxNumber: input.maxNumber,
    boolean: input.boolean,
    nested: _co1(input.nested),
    longString: input.longString
}); const _co1 = input => ({
    string: input.string,
    number: input.number,
    minNumber: input.minNumber,
    boolean: input.boolean,
    deepNumberArray: _cp0(input.deepNumberArray)
}); const _io1 = input => "string" === typeof input.string && "number" === typeof input.number && "number" === typeof input.minNumber && "boolean" === typeof input.boolean && (Array.isArray(input.deepNumberArray) && input.deepNumberArray.every(elem => "number" === typeof elem)); return input => _co0(input); })();
