import { SuperRefineFunction, fieldConfig as zodBaseFieldConfig } from '../zod/field-config';
import { fieldConfig as yupBaseFieldConfig } from '../yup/field-config';
import React, { ReactNode } from 'react';
import { FieldWrapperProps } from './types';
import { FieldConfig } from '../core/types';

/**
 * @deprecated Use `buildZodFieldConfig` instead.
 */
export function fieldConfig<FieldTypes = string, CustomData = Record<string, any>>(config: FieldConfig<ReactNode, FieldTypes, React.ComponentType<FieldWrapperProps>, CustomData>): SuperRefineFunction {
  return zodBaseFieldConfig<ReactNode, FieldTypes, React.ComponentType<FieldWrapperProps>, CustomData>(config);
}

export function buildZodFieldConfig<FieldTypes = string, CustomData = Record<string, any>>(): (config: FieldConfig<ReactNode, FieldTypes, React.ComponentType<FieldWrapperProps>, CustomData>) => SuperRefineFunction {
  return (config) => zodBaseFieldConfig<ReactNode, FieldTypes, React.ComponentType<FieldWrapperProps>, CustomData>(config);
}

export function buildYupFieldConfig<FieldTypes = string, CustomData = Record<string, any>>(): (config: FieldConfig<ReactNode, FieldTypes, React.ComponentType<FieldWrapperProps>, CustomData>) => ReturnType<typeof yupBaseFieldConfig> {
  return (config) => yupBaseFieldConfig<ReactNode, FieldTypes, React.ComponentType<FieldWrapperProps>, CustomData>(config);
}

export function getPathInObject(obj: any, path: string[]): any {
  let current = obj;
  for (const key of path) {
    current = current[key];

    if (current === undefined) {
      return undefined;
    }
  }
  return current;
}
