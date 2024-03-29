import type { AzureFunction } from '@azure/functions';
import type { Context } from '@azure/functions';
import { Render } from '@builder.io/qwik/server';
import type { RenderOptions } from '@builder.io/qwik';
import type { ServerRenderOptions } from '@builder.io/qwik-city/middleware/request-handler';

/**
 * @public
 */
export declare function createQwikCity(opts: QwikCityAzureOptions): AzureFunction;

/**
 * @public
 */
export declare interface PlatformAzure extends Partial<Context> {
}

/**
 * @public
 * @deprecated Please use `createQwikCity()` instead.
 *
 * Example:
 *
 * ```ts
 * import { createQwikCity } from '@builder.io/qwik-city/middleware/azure-swa';
 * import qwikCityPlan from '@qwik-city-plan';
 * import render from './entry.ssr';
 *
 * export default createQwikCity({ render, qwikCityPlan });
 * ```
 */
export declare function qwikCity(render: Render, opts?: RenderOptions): AzureFunction;

/**
 * @public
 */
export declare interface QwikCityAzureOptions extends ServerRenderOptions {
}

export { }
