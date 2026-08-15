window.__ModuleLoader__.load({ id: "dsh-providers", factory: (require) => {
var module = { exports: {} }; var exports = module.exports;
//#region rolldown:runtime
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __copyProps = (to, from, except, desc) => {
	if (from && typeof from === "object" || typeof from === "function") for (var keys = __getOwnPropNames(from), i = 0, n = keys.length, key; i < n; i++) {
		key = keys[i];
		if (!__hasOwnProp.call(to, key) && key !== except) __defProp(to, key, {
			get: ((k) => from[k]).bind(null, key),
			enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable
		});
	}
	return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", {
	value: mod,
	enumerable: true
}) : target, mod));

//#endregion
let __deepseek_ai_dsh_client_web_react = require("@deepseek-ai/dsh-client-web-react");
__deepseek_ai_dsh_client_web_react = __toESM(__deepseek_ai_dsh_client_web_react);
let react = require("react");
react = __toESM(react);
let __deepseek_ai_dsh_client_ui_primitives = require("@deepseek-ai/dsh-client-ui-primitives");
__deepseek_ai_dsh_client_ui_primitives = __toESM(__deepseek_ai_dsh_client_ui_primitives);
let react_jsx_runtime = require("react/jsx-runtime");
react_jsx_runtime = __toESM(react_jsx_runtime);

//#region \0dsh-css:src/client/AccountsSection.module.css.mjs
const css = "._3RHViq_section{flex-direction:column;gap:12px;height:100%;min-height:0;display:flex}._3RHViq_intro{color:var(--dsw-alias-label-secondary);margin:0;font-size:13px;line-height:20px}._3RHViq_search{width:100%}._3RHViq_list{flex-direction:column;flex:1;gap:16px;min-height:0;padding-right:4px;display:flex;overflow-y:auto}._3RHViq_group{flex-direction:column;gap:4px;display:flex}._3RHViq_groupLabel{color:var(--dsw-alias-label-tertiary);margin:0;padding:0 2px 2px;font-size:12px;font-weight:400;line-height:18px}._3RHViq_row{border:1px solid #0000;border-radius:10px}._3RHViq_rowOpen{border-color:var(--dsw-alias-border-l1);background:var(--dsw-alias-bg-layer-1)}._3RHViq_rowSummary{width:100%;min-height:36px;color:var(--dsw-alias-label-primary);text-align:left;cursor:pointer;background:0 0;border:none;border-radius:10px;align-items:center;gap:10px;padding:6px 12px;font-size:13px;display:flex}._3RHViq_rowSummary:hover{background:var(--dsw-alias-interactive-bg-hover)}._3RHViq_glyph{color:currentColor;flex-shrink:0}._3RHViq_darkOnly{display:none}body[data-ds-dark-theme] ._3RHViq_darkOnly{display:revert}body[data-ds-dark-theme] ._3RHViq_lightOnly{display:none}._3RHViq_monogram{border:1px solid var(--dsw-alias-border-l2);background:var(--dsw-alias-bg-layer-2);color:var(--dsw-alias-label-secondary);border-radius:5px;flex-shrink:0;justify-content:center;align-items:center;font-size:10px;font-weight:600;line-height:1;display:inline-flex}._3RHViq_rowName{text-overflow:ellipsis;white-space:nowrap;flex:1;min-width:0;overflow:hidden}._3RHViq_rowStatus{color:var(--dsw-alias-label-tertiary);flex-shrink:0;font-size:12px}._3RHViq_chevron,._3RHViq_chevronOpen{color:var(--dsw-alias-label-tertiary);flex-shrink:0;transition:transform .15s}._3RHViq_chevronOpen{transform:rotate(180deg)}._3RHViq_badge{background:var(--dsw-alias-state-business-tertiary);height:18px;color:var(--dsw-alias-state-business-primary);border-radius:4px;flex-shrink:0;align-items:center;padding:0 6px;font-size:11px;line-height:18px;display:inline-flex}._3RHViq_card{flex-direction:column;gap:12px;padding:2px 12px 14px;display:flex}._3RHViq_meta{color:var(--dsw-alias-label-tertiary);flex-wrap:wrap;align-items:baseline;gap:6px;margin:0;font-size:12px;line-height:18px;display:flex}._3RHViq_factRef{color:var(--dsw-alias-label-tertiary);font-family:ui-monospace,SFMono-Regular,Menlo,monospace;font-size:12px}._3RHViq_warn{color:var(--dsw-alias-state-warn-label)}._3RHViq_error{color:var(--dsw-alias-state-error-primary)}._3RHViq_notice{background:var(--dsw-alias-state-warn-tertiary);border-radius:8px;flex-wrap:wrap;align-items:center;gap:8px;padding:8px 10px;font-size:12px;line-height:18px;display:flex}._3RHViq_models{flex-direction:column;gap:6px;display:flex}._3RHViq_modelsHead{flex-wrap:wrap;align-items:center;gap:4px;display:flex}._3RHViq_modelsHead>button{white-space:nowrap;flex-shrink:0}._3RHViq_modelsLabel{color:var(--dsw-alias-label-primary);font-size:12px;font-weight:500;line-height:18px}._3RHViq_grow{flex:1}._3RHViq_modelList{flex-direction:column;align-items:flex-start;gap:10px;width:100%;display:flex}._3RHViq_modelGroupLabel{color:var(--dsw-alias-label-tertiary);margin:0;padding:6px 0 2px;font-family:ui-monospace,SFMono-Regular,Menlo,monospace;font-size:11px;line-height:16px}._3RHViq_modelGroupLabel:first-child{padding-top:0}._3RHViq_modelRows{background:var(--dsw-alias-bg-layer-1);border-radius:8px;flex-direction:column;width:100%;margin:0;padding:6px 10px;font-size:12px;line-height:20px;list-style:none;display:flex}._3RHViq_modelRow{align-items:baseline;gap:6px;min-width:0;padding:1px 0;display:flex}._3RHViq_modelName{color:var(--dsw-alias-label-primary);text-overflow:ellipsis;white-space:nowrap;overflow:hidden}._3RHViq_modelTag{background:var(--dsw-alias-bg-layer-2);color:var(--dsw-alias-label-tertiary);border-radius:4px;flex-shrink:0;align-self:center;padding:0 5px;font-size:10px;line-height:15px}._3RHViq_toolbar{align-items:center;gap:8px;display:flex}._3RHViq_toolbar>button{white-space:nowrap;flex-shrink:0}._3RHViq_catalogNotice{background:var(--dsw-alias-bg-layer-1);color:var(--dsw-alias-label-secondary);border-radius:8px;margin:0;padding:6px 10px;font-size:12px;line-height:18px}._3RHViq_discover{border:1px solid var(--dsw-alias-border-l1);background:var(--dsw-alias-bg-layer-1);border-radius:8px;flex-wrap:wrap;align-items:center;gap:8px;padding:8px 10px;display:flex}._3RHViq_discoverInput{flex:1;min-width:220px}._3RHViq_discover ._3RHViq_hint{flex-basis:100%}._3RHViq_actions{flex-wrap:wrap;align-items:center;gap:8px;display:flex}._3RHViq_destructive{margin-left:auto}._3RHViq_checkboxRow{color:var(--dsw-alias-label-secondary);cursor:pointer;align-items:center;gap:6px;font-size:12px;display:flex}._3RHViq_hint{color:var(--dsw-alias-label-tertiary);margin:0;font-size:12px;line-height:18px}._3RHViq_field{flex-direction:column;gap:6px;min-width:0;display:flex}._3RHViq_fieldLabel{color:var(--dsw-alias-label-primary);font-size:13px;line-height:20px}._3RHViq_fieldControl{min-width:0;display:flex;position:relative}._3RHViq_fieldInput{flex:1;min-width:0}._3RHViq_fieldInput input{padding-right:34px}._3RHViq_reveal{width:26px;height:26px;color:var(--dsw-alias-label-tertiary);cursor:pointer;background:0 0;border:none;border-radius:6px;justify-content:center;align-items:center;padding:0;display:inline-flex;position:absolute;top:50%;right:6px;transform:translateY(-50%)}._3RHViq_reveal:hover{background:var(--dsw-alias-interactive-bg-hover);color:var(--dsw-alias-label-secondary)}._3RHViq_confirmBody{flex-direction:column;gap:6px;min-width:0;display:flex}._3RHViq_wizard{flex-direction:column;gap:12px;width:100%;min-width:0;max-width:100%;display:flex}._3RHViq_wizardUrl{border:1px solid var(--dsw-alias-border-l1);background:var(--dsw-alias-bg-layer-1);border-radius:8px;flex-direction:column;gap:8px;min-width:0;padding:12px;display:flex}._3RHViq_wizardUrlText{min-width:0;max-height:132px;color:var(--dsw-alias-label-tertiary);overflow-wrap:anywhere;font-family:ui-monospace,SFMono-Regular,Menlo,monospace;font-size:11px;line-height:16px;overflow-y:auto}._3RHViq_deviceCode{letter-spacing:2px;color:var(--dsw-alias-label-primary);font-family:ui-monospace,SFMono-Regular,Menlo,monospace;font-size:20px}._3RHViq_promptRow{align-items:center;gap:8px;min-width:0;display:flex}._3RHViq_promptInput{flex:auto;min-width:0}._3RHViq_promptSubmit{flex:none}._3RHViq_log{max-height:160px;color:var(--dsw-alias-label-tertiary);flex-direction:column;gap:2px;font-size:12px;line-height:18px;display:flex;overflow-y:auto}._3RHViq_optionList{flex-direction:column;gap:4px;display:flex}._3RHViq_option{border:1px solid var(--dsw-alias-border-l1);color:var(--dsw-alias-label-primary);text-align:left;cursor:pointer;background:0 0;border-radius:8px;flex-direction:column;gap:2px;padding:8px;font-size:13px;display:flex}._3RHViq_option:hover{background:var(--dsw-alias-interactive-bg-hover)}._3RHViq_optionDescription{color:var(--dsw-alias-label-tertiary);font-size:12px}._3RHViq_seatRoot{display:inline-flex;position:relative}._3RHViq_seatTrigger{max-width:260px;height:26px;color:var(--dsw-alias-label-secondary);cursor:pointer;background:0 0;border:none;border-radius:6px;align-items:center;gap:6px;padding:0 8px;font-size:12px;line-height:18px;display:inline-flex}._3RHViq_seatTrigger:hover{background:var(--dsw-alias-interactive-bg-hover)}._3RHViq_seatTrigger:disabled{cursor:default;opacity:.6}._3RHViq_seatTriggerLabel{text-overflow:ellipsis;white-space:nowrap;overflow:hidden}._3RHViq_seatTriggerEffort{color:var(--dsw-alias-label-tertiary);flex-shrink:0}._3RHViq_seatChevron,._3RHViq_seatChevronOpen{color:var(--dsw-alias-label-tertiary);flex-shrink:0;transition:transform .15s}._3RHViq_seatChevronOpen{transform:rotate(180deg)}._3RHViq_seatMenu{z-index:30;border:1px solid var(--dsw-alias-border-l1);background:var(--dsw-alias-bg-layer-2);border-radius:10px;flex-direction:column;min-width:260px;max-width:340px;padding:4px;display:flex;position:absolute;bottom:calc(100% + 6px);right:0;box-shadow:0 8px 24px #0000001f}._3RHViq_seatCell{color:var(--dsw-alias-label-primary);text-align:left;cursor:pointer;background:0 0;border:none;border-radius:6px;align-items:center;gap:8px;padding:7px 10px;font-size:12px;line-height:18px;display:flex}._3RHViq_seatCell:hover{background:var(--dsw-alias-interactive-bg-hover)}._3RHViq_seatCellLabel{color:var(--dsw-alias-label-secondary);flex-shrink:0}._3RHViq_seatCellValue{flex:1;justify-content:flex-end;align-items:center;gap:6px;min-width:0;display:inline-flex}._3RHViq_seatCellValue>:first-child{flex-shrink:0}._3RHViq_seatCellValueText{text-overflow:ellipsis;white-space:nowrap;min-width:0;overflow:hidden}._3RHViq_seatCellChevron{color:var(--dsw-alias-label-tertiary);flex-shrink:0}._3RHViq_seatGroups{max-height:320px;overflow-y:auto}._3RHViq_seatGroup{flex-direction:column;display:flex}._3RHViq_seatGroupTitle{color:var(--dsw-alias-label-tertiary);align-items:center;gap:6px;padding:8px 10px 4px;font-size:11px;line-height:16px;display:flex}._3RHViq_seatOption{width:100%;color:var(--dsw-alias-label-primary);text-align:left;cursor:pointer;background:0 0;border:none;border-radius:6px;align-items:center;gap:8px;padding:6px 10px;font-size:12px;line-height:18px;display:flex}._3RHViq_seatOption:hover{background:var(--dsw-alias-interactive-bg-hover)}._3RHViq_seatOption:disabled{cursor:default;opacity:.6}._3RHViq_seatSelected{color:var(--dsw-alias-label-primary);font-weight:500}._3RHViq_seatOptionCopy{flex-direction:column;flex:1;min-width:0;display:flex}._3RHViq_seatOptionName{text-overflow:ellipsis;white-space:nowrap;overflow:hidden}._3RHViq_seatOptionDescription{color:var(--dsw-alias-label-tertiary);text-overflow:ellipsis;white-space:nowrap;font-size:11px;line-height:15px;overflow:hidden}._3RHViq_seatCheck{width:16px;color:var(--dsw-alias-state-business-primary);flex-shrink:0}._3RHViq_seatStatus,._3RHViq_seatEmpty{color:var(--dsw-alias-label-tertiary);padding:8px 10px;font-size:12px;line-height:18px}._3RHViq_seatError,._3RHViq_seatWarning{align-items:center;gap:8px;padding:6px 10px;font-size:12px;line-height:18px;display:flex}._3RHViq_seatError{color:var(--dsw-alias-state-error-primary)}._3RHViq_seatWarning{color:var(--dsw-alias-state-warn-label)}._3RHViq_seatRetry{color:var(--dsw-alias-label-secondary);cursor:pointer;background:0 0;border:none;flex-shrink:0;padding:0;font-size:12px;text-decoration:underline}";
const tagId = "dsh-providers/AccountsSection.module.css";
if (typeof document !== "undefined" && document.querySelector("style[data-plugin-css=" + JSON.stringify(tagId) + "]") === null) {
	const tag = document.createElement("style");
	tag.dataset.plugin = "dsh-providers";
	tag.dataset.pluginCss = tagId;
	tag.textContent = css;
	document.head.appendChild(tag);
}
var AccountsSection_module_css_default = {
	"actions": "_3RHViq_actions",
	"badge": "_3RHViq_badge",
	"card": "_3RHViq_card",
	"catalogNotice": "_3RHViq_catalogNotice",
	"checkboxRow": "_3RHViq_checkboxRow",
	"chevron": "_3RHViq_chevron",
	"chevronOpen": "_3RHViq_chevronOpen",
	"confirmBody": "_3RHViq_confirmBody",
	"darkOnly": "_3RHViq_darkOnly",
	"destructive": "_3RHViq_destructive",
	"deviceCode": "_3RHViq_deviceCode",
	"discover": "_3RHViq_discover",
	"discoverInput": "_3RHViq_discoverInput",
	"error": "_3RHViq_error",
	"factRef": "_3RHViq_factRef",
	"field": "_3RHViq_field",
	"fieldControl": "_3RHViq_fieldControl",
	"fieldInput": "_3RHViq_fieldInput",
	"fieldLabel": "_3RHViq_fieldLabel",
	"glyph": "_3RHViq_glyph",
	"group": "_3RHViq_group",
	"groupLabel": "_3RHViq_groupLabel",
	"grow": "_3RHViq_grow",
	"hint": "_3RHViq_hint",
	"intro": "_3RHViq_intro",
	"lightOnly": "_3RHViq_lightOnly",
	"list": "_3RHViq_list",
	"log": "_3RHViq_log",
	"meta": "_3RHViq_meta",
	"modelGroupLabel": "_3RHViq_modelGroupLabel",
	"modelList": "_3RHViq_modelList",
	"modelName": "_3RHViq_modelName",
	"modelRow": "_3RHViq_modelRow",
	"modelRows": "_3RHViq_modelRows",
	"models": "_3RHViq_models",
	"modelsHead": "_3RHViq_modelsHead",
	"modelsLabel": "_3RHViq_modelsLabel",
	"modelTag": "_3RHViq_modelTag",
	"monogram": "_3RHViq_monogram",
	"notice": "_3RHViq_notice",
	"option": "_3RHViq_option",
	"optionDescription": "_3RHViq_optionDescription",
	"optionList": "_3RHViq_optionList",
	"promptInput": "_3RHViq_promptInput",
	"promptRow": "_3RHViq_promptRow",
	"promptSubmit": "_3RHViq_promptSubmit",
	"reveal": "_3RHViq_reveal",
	"row": "_3RHViq_row",
	"rowName": "_3RHViq_rowName",
	"rowOpen": "_3RHViq_rowOpen",
	"rowStatus": "_3RHViq_rowStatus",
	"rowSummary": "_3RHViq_rowSummary",
	"search": "_3RHViq_search",
	"seatCell": "_3RHViq_seatCell",
	"seatCellChevron": "_3RHViq_seatCellChevron",
	"seatCellLabel": "_3RHViq_seatCellLabel",
	"seatCellValue": "_3RHViq_seatCellValue",
	"seatCellValueText": "_3RHViq_seatCellValueText",
	"seatCheck": "_3RHViq_seatCheck",
	"seatChevron": "_3RHViq_seatChevron",
	"seatChevronOpen": "_3RHViq_seatChevronOpen",
	"seatEmpty": "_3RHViq_seatEmpty",
	"seatError": "_3RHViq_seatError",
	"seatGroup": "_3RHViq_seatGroup",
	"seatGroups": "_3RHViq_seatGroups",
	"seatGroupTitle": "_3RHViq_seatGroupTitle",
	"seatMenu": "_3RHViq_seatMenu",
	"seatOption": "_3RHViq_seatOption",
	"seatOptionCopy": "_3RHViq_seatOptionCopy",
	"seatOptionDescription": "_3RHViq_seatOptionDescription",
	"seatOptionName": "_3RHViq_seatOptionName",
	"seatRetry": "_3RHViq_seatRetry",
	"seatRoot": "_3RHViq_seatRoot",
	"seatSelected": "_3RHViq_seatSelected",
	"seatStatus": "_3RHViq_seatStatus",
	"seatTrigger": "_3RHViq_seatTrigger",
	"seatTriggerEffort": "_3RHViq_seatTriggerEffort",
	"seatTriggerLabel": "_3RHViq_seatTriggerLabel",
	"seatWarning": "_3RHViq_seatWarning",
	"section": "_3RHViq_section",
	"toolbar": "_3RHViq_toolbar",
	"warn": "_3RHViq_warn",
	"wizard": "_3RHViq_wizard",
	"wizardUrl": "_3RHViq_wizardUrl",
	"wizardUrlText": "_3RHViq_wizardUrlText"
};

//#endregion
//#region src/client/SecretField.tsx
/** The eye at 16px, struck through while the value is visible. */
function EyeIcon({ struck }) {
	return /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("svg", {
		width: "16",
		height: "16",
		viewBox: "0 0 16 16",
		fill: "none",
		"aria-hidden": "true",
		children: [
			/* @__PURE__ */ (0, react_jsx_runtime.jsx)("path", {
				d: "M1.5 8s2.4-4.2 6.5-4.2S14.5 8 14.5 8s-2.4 4.2-6.5 4.2S1.5 8 1.5 8Z",
				stroke: "currentColor",
				strokeWidth: "1.2",
				strokeLinejoin: "round"
			}),
			/* @__PURE__ */ (0, react_jsx_runtime.jsx)("circle", {
				cx: "8",
				cy: "8",
				r: "1.9",
				stroke: "currentColor",
				strokeWidth: "1.2"
			}),
			struck && /* @__PURE__ */ (0, react_jsx_runtime.jsx)("path", {
				d: "m2.6 2.6 10.8 10.8",
				stroke: "currentColor",
				strokeWidth: "1.2",
				strokeLinecap: "round"
			})
		]
	});
}
/** Render a labelled secret input with a reveal toggle. */
function SecretField({ value, placeholder, label, showLabel, hideLabel, autoFocus = false, onChange, onSubmit, onReveal }) {
	const [revealed, setRevealed] = (0, react.useState)(false);
	return /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("label", {
		className: AccountsSection_module_css_default.field,
		children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", {
			className: AccountsSection_module_css_default.fieldLabel,
			children: label
		}), /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("span", {
			className: AccountsSection_module_css_default.fieldControl,
			children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)(__deepseek_ai_dsh_client_ui_primitives.Input, {
				className: AccountsSection_module_css_default.fieldInput,
				type: revealed ? "text" : "password",
				value,
				autoFocus,
				autoComplete: "off",
				spellCheck: false,
				...placeholder === void 0 ? {} : { placeholder },
				onChange: (event) => onChange(event.target.value),
				onKeyDown: (event) => {
					if (event.key === "Enter") onSubmit();
				}
			}), /* @__PURE__ */ (0, react_jsx_runtime.jsx)("button", {
				type: "button",
				className: AccountsSection_module_css_default.reveal,
				"aria-label": revealed ? hideLabel : showLabel,
				"aria-pressed": revealed,
				onClick: () => {
					setRevealed(!revealed);
					if (!revealed) onReveal?.();
				},
				children: /* @__PURE__ */ (0, react_jsx_runtime.jsx)(EyeIcon, { struck: revealed })
			})]
		})]
	});
}

//#endregion
//#region src/client/LoginDialog.tsx
/** Render the wizard for one login flow. */
function LoginDialog({ flow, providerName, t, onAnswer, onPeekKey, onClose }) {
	const [draft, setDraft] = (0, react.useState)(null);
	const [copied, setCopied] = (0, react.useState)(false);
	(0, react.useEffect)(() => {
		if (!copied) return void 0;
		const timer = setTimeout(() => setCopied(false), 2e3);
		return () => clearTimeout(timer);
	}, [copied]);
	const requestId = flow.prompt?.requestId;
	const typed = requestId !== void 0 && draft?.requestId === requestId ? draft.value : void 0;
	const prefillable = flow.prompt?.kind === "secret" && requestId === flow.prefillPromptId;
	const value = typed ?? (prefillable ? flow.storedKey ?? "" : "");
	const edit = (next) => {
		if (requestId !== void 0) setDraft({
			requestId,
			value: next
		});
	};
	const submit = () => {
		if (flow.prompt === null || flow.answering) return;
		onAnswer(value);
	};
	const copyUrl = async () => {
		if (flow.authUrl === null) return;
		setCopied(await (0, __deepseek_ai_dsh_client_ui_primitives.writeClipboard)(flow.authUrl));
	};
	return /* @__PURE__ */ (0, react_jsx_runtime.jsx)(__deepseek_ai_dsh_client_ui_primitives.Modal, {
		open: true,
		onClose,
		title: t("loginTitle", { provider: providerName }),
		closeLabel: t("close"),
		footer: flow.done || flow.error !== null ? /* @__PURE__ */ (0, react_jsx_runtime.jsx)(__deepseek_ai_dsh_client_ui_primitives.Button, {
			variant: "ghost",
			onClick: onClose,
			children: t("close")
		}) : void 0,
		children: /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
			className: AccountsSection_module_css_default.wizard,
			children: [
				flow.authUrl !== null && /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
					className: AccountsSection_module_css_default.wizardUrl,
					children: [
						flow.instructions !== null && /* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", { children: flow.instructions }),
						/* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", {
							className: AccountsSection_module_css_default.wizardUrlText,
							children: flow.authUrl
						}),
						/* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
							className: AccountsSection_module_css_default.actions,
							children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)(__deepseek_ai_dsh_client_ui_primitives.Button, {
								variant: "primary",
								onClick: () => window.open(flow.authUrl ?? "", "_blank", "noopener,noreferrer"),
								children: t("openLink")
							}), /* @__PURE__ */ (0, react_jsx_runtime.jsx)(__deepseek_ai_dsh_client_ui_primitives.Button, {
								variant: "outline",
								onClick: () => void copyUrl(),
								children: copied ? t("copied") : t("copyLink")
							})]
						})
					]
				}),
				flow.deviceCode !== null && /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
					className: AccountsSection_module_css_default.wizardUrl,
					children: [
						/* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", { children: t("deviceCodeTitle") }),
						/* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", {
							className: AccountsSection_module_css_default.deviceCode,
							children: flow.deviceCode.userCode
						}),
						/* @__PURE__ */ (0, react_jsx_runtime.jsx)(__deepseek_ai_dsh_client_ui_primitives.Button, {
							variant: "primary",
							onClick: () => window.open(flow.deviceCode?.verificationUri ?? "", "_blank", "noopener,noreferrer"),
							children: t("deviceCodeUrl")
						})
					]
				}),
				flow.prompt !== null && flow.prompt.kind === "select" && /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
					className: AccountsSection_module_css_default.optionList,
					children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", { children: flow.prompt.message }), (flow.prompt.options ?? []).map((option) => /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("button", {
						type: "button",
						className: AccountsSection_module_css_default.option,
						disabled: flow.answering,
						onClick: () => onAnswer(option.id),
						children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", { children: option.label }), option.description !== void 0 && /* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", {
							className: AccountsSection_module_css_default.optionDescription,
							children: option.description
						})]
					}, option.id))]
				}),
				flow.prompt !== null && flow.prompt.kind === "secret" && /* @__PURE__ */ (0, react_jsx_runtime.jsxs)(react_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)(SecretField, {
					label: flow.prompt.message,
					value,
					placeholder: flow.prompt.placeholder ?? t("secretPlaceholder"),
					showLabel: t("revealSecret"),
					hideLabel: t("hideSecret"),
					autoFocus: true,
					onChange: edit,
					onSubmit: submit,
					onReveal: () => {
						if (typed === void 0) onPeekKey();
					}
				}), /* @__PURE__ */ (0, react_jsx_runtime.jsx)(__deepseek_ai_dsh_client_ui_primitives.Button, {
					variant: "primary",
					disabled: flow.answering || value.trim().length === 0,
					onClick: submit,
					children: t("submit")
				})] }),
				flow.prompt !== null && flow.prompt.kind !== "select" && flow.prompt.kind !== "secret" && /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("label", {
					className: AccountsSection_module_css_default.field,
					children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", {
						className: AccountsSection_module_css_default.fieldLabel,
						children: flow.prompt.message
					}), /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
						className: AccountsSection_module_css_default.promptRow,
						children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)(__deepseek_ai_dsh_client_ui_primitives.Input, {
							className: AccountsSection_module_css_default.promptInput,
							type: "text",
							value,
							autoFocus: true,
							autoComplete: "off",
							spellCheck: false,
							placeholder: flow.prompt.placeholder ?? "",
							onChange: (event) => edit(event.target.value),
							onKeyDown: (event) => {
								if (event.key === "Enter") submit();
							}
						}), /* @__PURE__ */ (0, react_jsx_runtime.jsx)(__deepseek_ai_dsh_client_ui_primitives.Button, {
							variant: "primary",
							className: AccountsSection_module_css_default.promptSubmit,
							disabled: flow.answering,
							onClick: submit,
							children: t("submit")
						})]
					})]
				}),
				flow.progress !== null && /* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", { children: flow.progress }),
				flow.prompt === null && !flow.done && flow.error === null && flow.progress === null && (flow.authUrl !== null || flow.deviceCode !== null) && /* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", { children: t("waiting") }),
				flow.done && /* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", { children: t("done") }),
				flow.error !== null && /* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", {
					className: AccountsSection_module_css_default.error,
					children: `${t("loginFailed")}: ${flow.error}`
				}),
				flow.infos.length > 0 && /* @__PURE__ */ (0, react_jsx_runtime.jsx)("div", {
					className: AccountsSection_module_css_default.log,
					children: flow.infos.map((info) => /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("span", { children: [info.message, info.links.map((link) => /* @__PURE__ */ (0, react_jsx_runtime.jsx)("a", {
						href: link.url,
						target: "_blank",
						rel: "noopener noreferrer",
						children: ` ${link.label ?? link.url}`
					}, link.url))] }, info.id))
				})
			]
		})
	});
}

//#endregion
//#region src/client/LogoutDialog.tsx
/** Render the sign-out confirmation. */
function LogoutDialog({ providerName, routed, busy, t, onCancel, onConfirm }) {
	const [removeRoute, setRemoveRoute] = (0, react.useState)(false);
	return /* @__PURE__ */ (0, react_jsx_runtime.jsx)(__deepseek_ai_dsh_client_ui_primitives.Modal, {
		open: true,
		onClose: onCancel,
		title: t("logoutTitle", { provider: providerName }),
		closeLabel: t("close"),
		description: t("logoutDescription"),
		footer: /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
			className: AccountsSection_module_css_default.actions,
			children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)(__deepseek_ai_dsh_client_ui_primitives.Button, {
				variant: "ghost",
				onClick: onCancel,
				children: t("cancel")
			}), /* @__PURE__ */ (0, react_jsx_runtime.jsx)(__deepseek_ai_dsh_client_ui_primitives.Button, {
				variant: "primary",
				disabled: busy,
				onClick: () => onConfirm(removeRoute),
				children: busy ? t("signingOut") : t("logoutConfirm")
			})]
		}),
		children: routed && /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
			className: AccountsSection_module_css_default.confirmBody,
			children: [/* @__PURE__ */ (0, react_jsx_runtime.jsxs)("label", {
				className: AccountsSection_module_css_default.checkboxRow,
				children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)("input", {
					type: "checkbox",
					checked: removeRoute,
					onChange: (event) => setRemoveRoute(event.target.checked)
				}), t("removeRoute")]
			}), /* @__PURE__ */ (0, react_jsx_runtime.jsx)("p", {
				className: AccountsSection_module_css_default.hint,
				children: t("removeRouteHint")
			})]
		})
	});
}

//#endregion
//#region src/client/ModelList.tsx
/**
* How many models a collapsed list shows. Enough that a small provider shows
* everything without an expander; short enough that a 400-model gateway does
* not bury the card's own controls.
*/
const PREVIEW = 8;
/** Whether a model accepts images. */
function vision(model) {
	return model.input?.includes("image") === true;
}
/** Render one provider's models as a grouped, expandable list. */
function ModelList({ models, expanded, t, onToggleExpand }) {
	if (models.length === 0) return /* @__PURE__ */ (0, react_jsx_runtime.jsx)("p", {
		className: AccountsSection_module_css_default.hint,
		children: t("modelsEmpty")
	});
	const shown = expanded ? models : models.slice(0, PREVIEW);
	const hidden = models.length - shown.length;
	const groups = [];
	for (const model of shown) {
		const last = groups.at(-1);
		if (last?.route === model.route) last.models.push(model);
		else groups.push({
			route: model.route,
			...model.api === void 0 ? {} : { api: model.api },
			models: [model]
		});
	}
	const grouped = groups.length > 1;
	const tagged = shown.some(vision) && !shown.every(vision);
	return /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
		className: AccountsSection_module_css_default.modelList,
		children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)("ul", {
			className: AccountsSection_module_css_default.modelRows,
			children: groups.map((group) => /* @__PURE__ */ (0, react_jsx_runtime.jsxs)(react.Fragment, { children: [grouped && /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("li", {
				className: AccountsSection_module_css_default.modelGroupLabel,
				children: [group.route, group.api !== void 0 && ` · ${group.api}`]
			}), group.models.map((model) => /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("li", {
				className: AccountsSection_module_css_default.modelRow,
				title: model.id,
				children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", {
					className: AccountsSection_module_css_default.modelName,
					children: model.name
				}), tagged && vision(model) && /* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", {
					className: AccountsSection_module_css_default.modelTag,
					children: t("modalityImage")
				})]
			}, `${model.route}/${model.id}`))] }, group.route))
		}), (hidden > 0 || expanded) && /* @__PURE__ */ (0, react_jsx_runtime.jsx)(__deepseek_ai_dsh_client_ui_primitives.Button, {
			variant: "ghost",
			size: "sm",
			onClick: onToggleExpand,
			children: expanded ? t("modelsCollapse") : t("modelsExpand", { count: hidden })
		})]
	});
}

//#endregion
//#region node_modules/.pnpm/@lobehub+icons@5.16.0_@types+react@18.3.31_react@18.3.1/node_modules/@lobehub/icons/es/Ai302/style.js
var TITLE$61 = "302.AI";

//#endregion
//#region node_modules/.pnpm/@lobehub+icons@5.16.0_@types+react@18.3.31_react@18.3.1/node_modules/@lobehub/icons/es/Ai302/components/Color.js
function _typeof$62(o) {
	"@babel/helpers - typeof";
	return _typeof$62 = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(o$1) {
		return typeof o$1;
	} : function(o$1) {
		return o$1 && "function" == typeof Symbol && o$1.constructor === Symbol && o$1 !== Symbol.prototype ? "symbol" : typeof o$1;
	}, _typeof$62(o);
}
var _excluded$62 = ["size", "style"];
function ownKeys$62(e, r) {
	var t = Object.keys(e);
	if (Object.getOwnPropertySymbols) {
		var o = Object.getOwnPropertySymbols(e);
		r && (o = o.filter(function(r$1) {
			return Object.getOwnPropertyDescriptor(e, r$1).enumerable;
		})), t.push.apply(t, o);
	}
	return t;
}
function _objectSpread$62(e) {
	for (var r = 1; r < arguments.length; r++) {
		var t = null != arguments[r] ? arguments[r] : {};
		r % 2 ? ownKeys$62(Object(t), !0).forEach(function(r$1) {
			_defineProperty$62(e, r$1, t[r$1]);
		}) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys$62(Object(t)).forEach(function(r$1) {
			Object.defineProperty(e, r$1, Object.getOwnPropertyDescriptor(t, r$1));
		});
	}
	return e;
}
function _defineProperty$62(obj, key, value) {
	key = _toPropertyKey$62(key);
	if (key in obj) Object.defineProperty(obj, key, {
		value,
		enumerable: true,
		configurable: true,
		writable: true
	});
	else obj[key] = value;
	return obj;
}
function _toPropertyKey$62(t) {
	var i = _toPrimitive$62(t, "string");
	return "symbol" == _typeof$62(i) ? i : String(i);
}
function _toPrimitive$62(t, r) {
	if ("object" != _typeof$62(t) || !t) return t;
	var e = t[Symbol.toPrimitive];
	if (void 0 !== e) {
		var i = e.call(t, r || "default");
		if ("object" != _typeof$62(i)) return i;
		throw new TypeError("@@toPrimitive must return a primitive value.");
	}
	return ("string" === r ? String : Number)(t);
}
function _objectWithoutProperties$62(source, excluded) {
	if (source == null) return {};
	var target = _objectWithoutPropertiesLoose$62(source, excluded);
	var key, i;
	if (Object.getOwnPropertySymbols) {
		var sourceSymbolKeys = Object.getOwnPropertySymbols(source);
		for (i = 0; i < sourceSymbolKeys.length; i++) {
			key = sourceSymbolKeys[i];
			if (excluded.indexOf(key) >= 0) continue;
			if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue;
			target[key] = source[key];
		}
	}
	return target;
}
function _objectWithoutPropertiesLoose$62(source, excluded) {
	if (source == null) return {};
	var target = {};
	var sourceKeys = Object.keys(source);
	var key, i;
	for (i = 0; i < sourceKeys.length; i++) {
		key = sourceKeys[i];
		if (excluded.indexOf(key) >= 0) continue;
		target[key] = source[key];
	}
	return target;
}
var Icon$62 = /* @__PURE__ */ (0, react.memo)(function(_ref) {
	var _ref$size = _ref.size, size = _ref$size === void 0 ? "1em" : _ref$size, style = _ref.style, rest = _objectWithoutProperties$62(_ref, _excluded$62);
	return /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("svg", _objectSpread$62(_objectSpread$62({
		height: size,
		style: _objectSpread$62({
			flex: "none",
			lineHeight: 1
		}, style),
		viewBox: "0 0 24 24",
		width: size,
		xmlns: "http://www.w3.org/2000/svg"
	}, rest), {}, { children: [
		/* @__PURE__ */ (0, react_jsx_runtime.jsx)("title", { children: TITLE$61 }),
		/* @__PURE__ */ (0, react_jsx_runtime.jsx)("path", {
			d: "M13.086 23.25c5.614 0 10.164-4.559 10.164-10.182 0-5.624-4.55-10.182-10.164-10.182-5.613 0-10.163 4.558-10.163 10.182 0 5.623 4.55 10.182 10.163 10.182z",
			fill: "#3F3FAA"
		}),
		/* @__PURE__ */ (0, react_jsx_runtime.jsx)("path", {
			d: "M10.914 21.114c5.613 0 10.163-4.559 10.163-10.182S16.527.75 10.914.75C5.3.75.75 5.309.75 10.932S5.3 21.114 10.914 21.114z",
			fill: "#8E47FF"
		}),
		/* @__PURE__ */ (0, react_jsx_runtime.jsx)("path", {
			d: "M10.755 17.708c-.722 0-1.416-.24-1.995-.69a3.25 3.25 0 01-1.23-2.177 3.248 3.248 0 01-.006-.782c-.201.04-.407.056-.618.056a3.265 3.265 0 01-3.261-3.262A3.27 3.27 0 017.65 7.67a3.27 3.27 0 013.241-3.638 3.266 3.266 0 013.242 3.577 3.269 3.269 0 012.694 5.693 3.227 3.227 0 01-2.365.782 3.26 3.26 0 01-.466-.066c0 .008.005.014.005.02a3.254 3.254 0 01-.664 2.41 3.235 3.235 0 01-2.583 1.259zm-1.808-4.313c-.228.397-.32.847-.263 1.304a2.092 2.092 0 002.335 1.826 2.086 2.086 0 001.398-.791 2.08 2.08 0 00.425-1.548 2.091 2.091 0 00-.405-1.004 3.253 3.253 0 01-.39-.462.58.58 0 11.947-.675c.044.062.088.117.137.173a.61.61 0 01.111.101l.056.071a2.096 2.096 0 003.49-1.405 2.096 2.096 0 00-1.93-2.248 2.076 2.076 0 00-1.251.304.579.579 0 01-.648.061.59.59 0 01-.233-.796A2.102 2.102 0 0010.888 5.2 2.1 2.1 0 009.14 8.457l.03.056c.61.594.993 1.42.993 2.339A3.273 3.273 0 018.947 13.4v-.005zM6.901 8.752a2.098 2.098 0 00-2.092 2.1c0 1.16.936 2.101 2.092 2.101a2.1 2.1 0 000-4.201z",
			fill: "#fff"
		})
	] }));
});
var Color_default = Icon$62;

//#endregion
//#region node_modules/.pnpm/@lobehub+icons@5.16.0_@types+react@18.3.31_react@18.3.1/node_modules/@lobehub/icons/es/AiHubMix/style.js
var TITLE$60 = "AiHubMix";

//#endregion
//#region node_modules/.pnpm/@lobehub+icons@5.16.0_@types+react@18.3.31_react@18.3.1/node_modules/@lobehub/icons/es/AiHubMix/components/Color.js
function _typeof$61(o) {
	"@babel/helpers - typeof";
	return _typeof$61 = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(o$1) {
		return typeof o$1;
	} : function(o$1) {
		return o$1 && "function" == typeof Symbol && o$1.constructor === Symbol && o$1 !== Symbol.prototype ? "symbol" : typeof o$1;
	}, _typeof$61(o);
}
var _excluded$61 = ["size", "style"];
function ownKeys$61(e, r) {
	var t = Object.keys(e);
	if (Object.getOwnPropertySymbols) {
		var o = Object.getOwnPropertySymbols(e);
		r && (o = o.filter(function(r$1) {
			return Object.getOwnPropertyDescriptor(e, r$1).enumerable;
		})), t.push.apply(t, o);
	}
	return t;
}
function _objectSpread$61(e) {
	for (var r = 1; r < arguments.length; r++) {
		var t = null != arguments[r] ? arguments[r] : {};
		r % 2 ? ownKeys$61(Object(t), !0).forEach(function(r$1) {
			_defineProperty$61(e, r$1, t[r$1]);
		}) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys$61(Object(t)).forEach(function(r$1) {
			Object.defineProperty(e, r$1, Object.getOwnPropertyDescriptor(t, r$1));
		});
	}
	return e;
}
function _defineProperty$61(obj, key, value) {
	key = _toPropertyKey$61(key);
	if (key in obj) Object.defineProperty(obj, key, {
		value,
		enumerable: true,
		configurable: true,
		writable: true
	});
	else obj[key] = value;
	return obj;
}
function _toPropertyKey$61(t) {
	var i = _toPrimitive$61(t, "string");
	return "symbol" == _typeof$61(i) ? i : String(i);
}
function _toPrimitive$61(t, r) {
	if ("object" != _typeof$61(t) || !t) return t;
	var e = t[Symbol.toPrimitive];
	if (void 0 !== e) {
		var i = e.call(t, r || "default");
		if ("object" != _typeof$61(i)) return i;
		throw new TypeError("@@toPrimitive must return a primitive value.");
	}
	return ("string" === r ? String : Number)(t);
}
function _objectWithoutProperties$61(source, excluded) {
	if (source == null) return {};
	var target = _objectWithoutPropertiesLoose$61(source, excluded);
	var key, i;
	if (Object.getOwnPropertySymbols) {
		var sourceSymbolKeys = Object.getOwnPropertySymbols(source);
		for (i = 0; i < sourceSymbolKeys.length; i++) {
			key = sourceSymbolKeys[i];
			if (excluded.indexOf(key) >= 0) continue;
			if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue;
			target[key] = source[key];
		}
	}
	return target;
}
function _objectWithoutPropertiesLoose$61(source, excluded) {
	if (source == null) return {};
	var target = {};
	var sourceKeys = Object.keys(source);
	var key, i;
	for (i = 0; i < sourceKeys.length; i++) {
		key = sourceKeys[i];
		if (excluded.indexOf(key) >= 0) continue;
		target[key] = source[key];
	}
	return target;
}
var Icon$61 = /* @__PURE__ */ (0, react.memo)(function(_ref) {
	var _ref$size = _ref.size, size = _ref$size === void 0 ? "1em" : _ref$size, style = _ref.style, rest = _objectWithoutProperties$61(_ref, _excluded$61);
	return /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("svg", _objectSpread$61(_objectSpread$61({
		height: size,
		style: _objectSpread$61({
			flex: "none",
			lineHeight: 1
		}, style),
		viewBox: "0 0 24 24",
		width: size,
		xmlns: "http://www.w3.org/2000/svg"
	}, rest), {}, { children: [
		/* @__PURE__ */ (0, react_jsx_runtime.jsx)("title", { children: TITLE$60 }),
		/* @__PURE__ */ (0, react_jsx_runtime.jsx)("path", {
			d: "M12 24c6.627 0 12-5.373 12-12S18.627 0 12 0 0 5.373 0 12s5.373 12 12 12z",
			fill: "#006FFB"
		}),
		/* @__PURE__ */ (0, react_jsx_runtime.jsx)("path", {
			clipRule: "evenodd",
			d: "M11.24 8.393c.095-.644.302-1.47.624-2.48L12 5.496l.136.417c.322 1.01.53 1.836.624 2.48.071.472.071 1.072 0 1.8-.072.731-.072 1.336 0 1.814.106.7.426 1.281.96 1.744a2.795 2.795 0 001.89.708 2.78 2.78 0 002.034-.84c.56-.559.842-1.234.848-2.024.003-.7.075-1.472.216-2.316.069-.422.14-.775.21-1.06l.095-.384.168.356a7.862 7.862 0 01.76 3.244v.16a7.84 7.84 0 01-.624 3.089 7.952 7.952 0 01-4.228 4.228 7.841 7.841 0 01-3.089.623 7.84 7.84 0 01-3.089-.623 7.952 7.952 0 01-4.228-4.228 7.84 7.84 0 01-.623-3.09v-.159a7.862 7.862 0 01.759-3.244l.169-.356.093.385c.072.284.143.637.211 1.059.141.844.213 1.616.216 2.316.006.79.29 1.465.848 2.024.563.56 1.241.84 2.035.84.715 0 1.345-.236 1.889-.708a2.79 2.79 0 00.96-1.744c.073-.478.073-1.083 0-1.814-.071-.728-.071-1.328 0-1.8zm.76 9.694c1.097 0 2.125-.26 3.085-.778a6.379 6.379 0 001.77-1.399c.063-.07-.01-.178-.101-.153-.37.1-.75.15-1.144.15a4.236 4.236 0 01-2.18-.59 4.253 4.253 0 01-1.35-1.233.099.099 0 00-.16 0 4.253 4.253 0 01-1.35 1.232 4.236 4.236 0 01-2.18.591c-.393 0-.774-.05-1.143-.15-.091-.025-.165.083-.102.153a6.38 6.38 0 001.77 1.399c.96.518 1.988.778 3.085.778z",
			fill: "#fff",
			fillRule: "evenodd"
		})
	] }));
});
var Color_default$1 = Icon$61;

//#endregion
//#region node_modules/.pnpm/es-toolkit@1.50.0/node_modules/es-toolkit/dist/string/words.mjs
/**
* Regular expression pattern to split strings into words for various case conversions
*
* This pattern matches sequences of characters in a string, considering the following cases:
* - Sequences of two or more uppercase letters followed by an uppercase letter and lowercase letters or digits (for acronyms)
* - Sequences of one uppercase letter optionally followed by lowercase letters and digits
* - Single uppercase letters
* - Sequences of digits
* - Emojis and other Unicode characters
*
* The resulting match can be used to convert camelCase, snake_case, kebab-case, and other mixed formats into
* a consistent format like snake case. It also supports emojis and other Unicode characters.
*
* @example
* const matches = 'camelCaseHTTPRequest🚀'.match(CASE_SPLIT_PATTERN);
* // matches: ['camel', 'Case', 'HTTP', 'Request', '🚀']
*/
const CASE_SPLIT_PATTERN = /\p{Lu}?\p{Ll}+|[0-9]+|\p{Lu}+(?!\p{Ll})|\p{Emoji_Presentation}|\p{Extended_Pictographic}|\p{L}+/gu;
/**
* Splits `string` into an array of its words, treating spaces and punctuation marks as separators.
*
* @param str The string to inspect.
* @param [pattern] The pattern to match words.
* @returns Returns the words of `string`.
*
* @example
* words('fred, barney, & pebbles');
* // => ['fred', 'barney', 'pebbles']
*
* words('camelCaseHTTPRequest🚀');
* // => ['camel', 'Case', 'HTTP', 'Request', '🚀']
*
* words('Lunedì 18 Set')
* // => ['Lunedì', '18', 'Set']
*/
function words(str) {
	return Array.from(str.match(CASE_SPLIT_PATTERN) ?? []);
}

//#endregion
//#region node_modules/.pnpm/es-toolkit@1.50.0/node_modules/es-toolkit/dist/string/kebabCase.mjs
/**
* Converts a string to kebab case.
*
* Kebab case is the naming convention in which each word is written in lowercase and separated by a dash (-) character.
*
* @param str - The string that is to be changed to kebab case.
* @returns The converted string to kebab case.
*
* @example
* const convertedStr1 = kebabCase('camelCase') // returns 'camel-case'
* const convertedStr2 = kebabCase('some whitespace') // returns 'some-whitespace'
* const convertedStr3 = kebabCase('hyphen-text') // returns 'hyphen-text'
* const convertedStr4 = kebabCase('HTTPRequest') // returns 'http-request'
*/
function kebabCase(str) {
	return words(str).map((word) => word.toLowerCase()).join("-");
}

//#endregion
//#region node_modules/.pnpm/@lobehub+icons@5.16.0_@types+react@18.3.31_react@18.3.1/node_modules/@lobehub/icons/es/hooks/useFillId.js
var useFillId = function useFillId$1(namespace) {
	var uniqueId = (0, react.useId)();
	var id = "lobe-icons-".concat(kebabCase(namespace), "-").concat(uniqueId);
	return (0, react.useMemo)(function() {
		return {
			fill: "url(#".concat(id, ")"),
			id
		};
	}, [namespace]);
};
var useFillIds = function useFillIds$1(namespace, length) {
	var uniqueId = (0, react.useId)();
	return (0, react.useMemo)(function() {
		return Array.from({ length }, function(_, i) {
			var id = "lobe-icons-".concat(kebabCase(namespace), "-").concat(i, "-").concat(uniqueId);
			return {
				fill: "url(#".concat(id, ")"),
				id
			};
		});
	}, [
		namespace,
		length,
		uniqueId
	]);
};

//#endregion
//#region node_modules/.pnpm/@lobehub+icons@5.16.0_@types+react@18.3.31_react@18.3.1/node_modules/@lobehub/icons/es/AntGroup/style.js
var TITLE$59 = "AntGroup";

//#endregion
//#region node_modules/.pnpm/@lobehub+icons@5.16.0_@types+react@18.3.31_react@18.3.1/node_modules/@lobehub/icons/es/AntGroup/components/Color.js
function _typeof$60(o) {
	"@babel/helpers - typeof";
	return _typeof$60 = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(o$1) {
		return typeof o$1;
	} : function(o$1) {
		return o$1 && "function" == typeof Symbol && o$1.constructor === Symbol && o$1 !== Symbol.prototype ? "symbol" : typeof o$1;
	}, _typeof$60(o);
}
var _excluded$60 = ["size", "style"];
function ownKeys$60(e, r) {
	var t = Object.keys(e);
	if (Object.getOwnPropertySymbols) {
		var o = Object.getOwnPropertySymbols(e);
		r && (o = o.filter(function(r$1) {
			return Object.getOwnPropertyDescriptor(e, r$1).enumerable;
		})), t.push.apply(t, o);
	}
	return t;
}
function _objectSpread$60(e) {
	for (var r = 1; r < arguments.length; r++) {
		var t = null != arguments[r] ? arguments[r] : {};
		r % 2 ? ownKeys$60(Object(t), !0).forEach(function(r$1) {
			_defineProperty$60(e, r$1, t[r$1]);
		}) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys$60(Object(t)).forEach(function(r$1) {
			Object.defineProperty(e, r$1, Object.getOwnPropertyDescriptor(t, r$1));
		});
	}
	return e;
}
function _defineProperty$60(obj, key, value) {
	key = _toPropertyKey$60(key);
	if (key in obj) Object.defineProperty(obj, key, {
		value,
		enumerable: true,
		configurable: true,
		writable: true
	});
	else obj[key] = value;
	return obj;
}
function _toPropertyKey$60(t) {
	var i = _toPrimitive$60(t, "string");
	return "symbol" == _typeof$60(i) ? i : String(i);
}
function _toPrimitive$60(t, r) {
	if ("object" != _typeof$60(t) || !t) return t;
	var e = t[Symbol.toPrimitive];
	if (void 0 !== e) {
		var i = e.call(t, r || "default");
		if ("object" != _typeof$60(i)) return i;
		throw new TypeError("@@toPrimitive must return a primitive value.");
	}
	return ("string" === r ? String : Number)(t);
}
function _slicedToArray$3(arr, i) {
	return _arrayWithHoles$3(arr) || _iterableToArrayLimit$3(arr, i) || _unsupportedIterableToArray$3(arr, i) || _nonIterableRest$3();
}
function _nonIterableRest$3() {
	throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}
function _unsupportedIterableToArray$3(o, minLen) {
	if (!o) return;
	if (typeof o === "string") return _arrayLikeToArray$3(o, minLen);
	var n = Object.prototype.toString.call(o).slice(8, -1);
	if (n === "Object" && o.constructor) n = o.constructor.name;
	if (n === "Map" || n === "Set") return Array.from(o);
	if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray$3(o, minLen);
}
function _arrayLikeToArray$3(arr, len) {
	if (len == null || len > arr.length) len = arr.length;
	for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i];
	return arr2;
}
function _iterableToArrayLimit$3(r, l) {
	var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"];
	if (null != t) {
		var e, n, i, u, a = [], f = !0, o = !1;
		try {
			if (i = (t = t.call(r)).next, 0 === l) {
				if (Object(t) !== t) return;
				f = !1;
			} else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0);
		} catch (r$1) {
			o = !0, n = r$1;
		} finally {
			try {
				if (!f && null != t.return && (u = t.return(), Object(u) !== u)) return;
			} finally {
				if (o) throw n;
			}
		}
		return a;
	}
}
function _arrayWithHoles$3(arr) {
	if (Array.isArray(arr)) return arr;
}
function _objectWithoutProperties$60(source, excluded) {
	if (source == null) return {};
	var target = _objectWithoutPropertiesLoose$60(source, excluded);
	var key, i;
	if (Object.getOwnPropertySymbols) {
		var sourceSymbolKeys = Object.getOwnPropertySymbols(source);
		for (i = 0; i < sourceSymbolKeys.length; i++) {
			key = sourceSymbolKeys[i];
			if (excluded.indexOf(key) >= 0) continue;
			if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue;
			target[key] = source[key];
		}
	}
	return target;
}
function _objectWithoutPropertiesLoose$60(source, excluded) {
	if (source == null) return {};
	var target = {};
	var sourceKeys = Object.keys(source);
	var key, i;
	for (i = 0; i < sourceKeys.length; i++) {
		key = sourceKeys[i];
		if (excluded.indexOf(key) >= 0) continue;
		target[key] = source[key];
	}
	return target;
}
var Icon$60 = /* @__PURE__ */ (0, react.memo)(function(_ref) {
	var _ref$size = _ref.size, size = _ref$size === void 0 ? "1em" : _ref$size, style = _ref.style, rest = _objectWithoutProperties$60(_ref, _excluded$60);
	var _useFillIds2 = _slicedToArray$3(useFillIds(TITLE$59, 3), 3), a = _useFillIds2[0], b = _useFillIds2[1], c = _useFillIds2[2];
	return /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("svg", _objectSpread$60(_objectSpread$60({
		height: size,
		style: _objectSpread$60({
			flex: "none",
			lineHeight: 1
		}, style),
		viewBox: "0 0 24 24",
		width: size,
		xmlns: "http://www.w3.org/2000/svg"
	}, rest), {}, { children: [
		/* @__PURE__ */ (0, react_jsx_runtime.jsx)("title", { children: TITLE$59 }),
		/* @__PURE__ */ (0, react_jsx_runtime.jsx)("path", {
			d: "M9.797 6.282a.451.451 0 01-.336-.315 1.019 1.019 0 010-.505c.156-.86.3-1.725.501-2.577.14-.7.42-1.367.823-1.96.305-.431.75-.746 1.262-.89.877-.217 1.24.629.937 1.348-.259.593-.877.914-1.334 1.348-.835.795-1.096 2.14-1.336 3.212a.427.427 0 01-.186.277.437.437 0 01-.331.062z",
			fill: a.fill,
			transform: "translate(3)"
		}),
		/* @__PURE__ */ (0, react_jsx_runtime.jsx)("path", {
			d: "M6.334 4.672c.33-.121.682.146.946.297.278.145.587.219.901.214.231.01.466 0 .688.018 4.098.176 7.484 3.22 8.05 7.237.565 4.016-1.852 7.859-5.745 9.134-3.894 1.276-8.153-.38-10.126-3.935A8.339 8.339 0 013.133 7.081c.348-.278.716-.53 1.102-.755a8.404 8.404 0 001.318-.79c.28-.243.45-.742.781-.864zm4.406 2.15c-2.841.003-4.898 2.533-4.628 5.642.27 3.109 2.781 5.641 5.613 5.665 2.832.024 4.932-2.512 4.658-5.644-.273-3.133-2.802-5.666-5.643-5.663zm.357.57a4.707 4.707 0 013.304 1.446 5.703 5.703 0 011.643 3.49 4.841 4.841 0 01-1.141 3.705v.015a3.923 3.923 0 01-2.808 1.303 4.664 4.664 0 01-3.367-1.387 5.678 5.678 0 01-1.71-3.518 4.832 4.832 0 011.14-3.753 3.923 3.923 0 012.813-1.3h.126z",
			fill: b.fill,
			transform: "translate(3)"
		}),
		/* @__PURE__ */ (0, react_jsx_runtime.jsx)("path", {
			d: "M2.346 2.054a1.26 1.26 0 01.384-.594.842.842 0 011.165.11c.694.82.169 2.078.142 3.02.013.805.208 1.597.57 2.318.084.134.147.279.186.43a.539.539 0 01-.3.577c-.345.17-.568-.19-.709-.446-.324-.6-.617-1.216-.877-1.846a8.698 8.698 0 01-.618-1.987 7.523 7.523 0 01-.051-.37 3.717 3.717 0 01-.024-.34 2.506 2.506 0 01.132-.872z",
			fill: c.fill,
			transform: "translate(3)"
		}),
		/* @__PURE__ */ (0, react_jsx_runtime.jsxs)("defs", { children: [
			/* @__PURE__ */ (0, react_jsx_runtime.jsxs)("linearGradient", {
				id: a.id,
				x1: "31.373%",
				x2: "61.365%",
				y1: "95.551%",
				y2: "-.348%",
				children: [
					/* @__PURE__ */ (0, react_jsx_runtime.jsx)("stop", {
						offset: "0%",
						stopColor: "#06F"
					}),
					/* @__PURE__ */ (0, react_jsx_runtime.jsx)("stop", {
						offset: "20%",
						stopColor: "#1677FF"
					}),
					/* @__PURE__ */ (0, react_jsx_runtime.jsx)("stop", {
						offset: "100%",
						stopColor: "#04A6FF"
					})
				]
			}),
			/* @__PURE__ */ (0, react_jsx_runtime.jsxs)("linearGradient", {
				id: b.id,
				x1: "4.366%",
				x2: "94.359%",
				y1: "65.982%",
				y2: "32.918%",
				children: [
					/* @__PURE__ */ (0, react_jsx_runtime.jsx)("stop", {
						offset: "0%",
						stopColor: "#06F"
					}),
					/* @__PURE__ */ (0, react_jsx_runtime.jsx)("stop", {
						offset: "20%",
						stopColor: "#1677FF"
					}),
					/* @__PURE__ */ (0, react_jsx_runtime.jsx)("stop", {
						offset: "100%",
						stopColor: "#04A6FF"
					})
				]
			}),
			/* @__PURE__ */ (0, react_jsx_runtime.jsxs)("linearGradient", {
				id: c.id,
				x1: "56.255%",
				x2: "45.986%",
				y1: "99.257%",
				y2: "1.384%",
				children: [
					/* @__PURE__ */ (0, react_jsx_runtime.jsx)("stop", {
						offset: "0%",
						stopColor: "#06F"
					}),
					/* @__PURE__ */ (0, react_jsx_runtime.jsx)("stop", {
						offset: "20%",
						stopColor: "#1677FF"
					}),
					/* @__PURE__ */ (0, react_jsx_runtime.jsx)("stop", {
						offset: "100%",
						stopColor: "#04A6FF"
					})
				]
			})
		] })
	] }));
});
var Color_default$2 = Icon$60;

//#endregion
//#region node_modules/.pnpm/@lobehub+icons@5.16.0_@types+react@18.3.31_react@18.3.1/node_modules/@lobehub/icons/es/Claude/style.js
var TITLE$58 = "Claude";

//#endregion
//#region node_modules/.pnpm/@lobehub+icons@5.16.0_@types+react@18.3.31_react@18.3.1/node_modules/@lobehub/icons/es/Claude/components/Color.js
function _typeof$59(o) {
	"@babel/helpers - typeof";
	return _typeof$59 = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(o$1) {
		return typeof o$1;
	} : function(o$1) {
		return o$1 && "function" == typeof Symbol && o$1.constructor === Symbol && o$1 !== Symbol.prototype ? "symbol" : typeof o$1;
	}, _typeof$59(o);
}
var _excluded$59 = ["size", "style"];
function ownKeys$59(e, r) {
	var t = Object.keys(e);
	if (Object.getOwnPropertySymbols) {
		var o = Object.getOwnPropertySymbols(e);
		r && (o = o.filter(function(r$1) {
			return Object.getOwnPropertyDescriptor(e, r$1).enumerable;
		})), t.push.apply(t, o);
	}
	return t;
}
function _objectSpread$59(e) {
	for (var r = 1; r < arguments.length; r++) {
		var t = null != arguments[r] ? arguments[r] : {};
		r % 2 ? ownKeys$59(Object(t), !0).forEach(function(r$1) {
			_defineProperty$59(e, r$1, t[r$1]);
		}) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys$59(Object(t)).forEach(function(r$1) {
			Object.defineProperty(e, r$1, Object.getOwnPropertyDescriptor(t, r$1));
		});
	}
	return e;
}
function _defineProperty$59(obj, key, value) {
	key = _toPropertyKey$59(key);
	if (key in obj) Object.defineProperty(obj, key, {
		value,
		enumerable: true,
		configurable: true,
		writable: true
	});
	else obj[key] = value;
	return obj;
}
function _toPropertyKey$59(t) {
	var i = _toPrimitive$59(t, "string");
	return "symbol" == _typeof$59(i) ? i : String(i);
}
function _toPrimitive$59(t, r) {
	if ("object" != _typeof$59(t) || !t) return t;
	var e = t[Symbol.toPrimitive];
	if (void 0 !== e) {
		var i = e.call(t, r || "default");
		if ("object" != _typeof$59(i)) return i;
		throw new TypeError("@@toPrimitive must return a primitive value.");
	}
	return ("string" === r ? String : Number)(t);
}
function _objectWithoutProperties$59(source, excluded) {
	if (source == null) return {};
	var target = _objectWithoutPropertiesLoose$59(source, excluded);
	var key, i;
	if (Object.getOwnPropertySymbols) {
		var sourceSymbolKeys = Object.getOwnPropertySymbols(source);
		for (i = 0; i < sourceSymbolKeys.length; i++) {
			key = sourceSymbolKeys[i];
			if (excluded.indexOf(key) >= 0) continue;
			if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue;
			target[key] = source[key];
		}
	}
	return target;
}
function _objectWithoutPropertiesLoose$59(source, excluded) {
	if (source == null) return {};
	var target = {};
	var sourceKeys = Object.keys(source);
	var key, i;
	for (i = 0; i < sourceKeys.length; i++) {
		key = sourceKeys[i];
		if (excluded.indexOf(key) >= 0) continue;
		target[key] = source[key];
	}
	return target;
}
var Icon$59 = /* @__PURE__ */ (0, react.memo)(function(_ref) {
	var _ref$size = _ref.size, size = _ref$size === void 0 ? "1em" : _ref$size, style = _ref.style, rest = _objectWithoutProperties$59(_ref, _excluded$59);
	return /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("svg", _objectSpread$59(_objectSpread$59({
		height: size,
		style: _objectSpread$59({
			flex: "none",
			lineHeight: 1
		}, style),
		viewBox: "0 0 24 24",
		width: size,
		xmlns: "http://www.w3.org/2000/svg"
	}, rest), {}, { children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)("title", { children: TITLE$58 }), /* @__PURE__ */ (0, react_jsx_runtime.jsx)("path", {
		d: "M4.709 15.955l4.72-2.647.08-.23-.08-.128H9.2l-.79-.048-2.698-.073-2.339-.097-2.266-.122-.571-.121L0 11.784l.055-.352.48-.321.686.06 1.52.103 2.278.158 1.652.097 2.449.255h.389l.055-.157-.134-.098-.103-.097-2.358-1.596-2.552-1.688-1.336-.972-.724-.491-.364-.462-.158-1.008.656-.722.881.06.225.061.893.686 1.908 1.476 2.491 1.833.365.304.145-.103.019-.073-.164-.274-1.355-2.446-1.446-2.49-.644-1.032-.17-.619a2.97 2.97 0 01-.104-.729L6.283.134 6.696 0l.996.134.42.364.62 1.414 1.002 2.229 1.555 3.03.456.898.243.832.091.255h.158V9.01l.128-1.706.237-2.095.23-2.695.08-.76.376-.91.747-.492.584.28.48.685-.067.444-.286 1.851-.559 2.903-.364 1.942h.212l.243-.242.985-1.306 1.652-2.064.73-.82.85-.904.547-.431h1.033l.76 1.129-.34 1.166-1.064 1.347-.881 1.142-1.264 1.7-.79 1.36.073.11.188-.02 2.856-.606 1.543-.28 1.841-.315.833.388.091.395-.328.807-1.969.486-2.309.462-3.439.813-.042.03.049.061 1.549.146.662.036h1.622l3.02.225.79.522.474.638-.079.485-1.215.62-1.64-.389-3.829-.91-1.312-.329h-.182v.11l1.093 1.068 2.006 1.81 2.509 2.33.127.578-.322.455-.34-.049-2.205-1.657-.851-.747-1.926-1.62h-.128v.17l.444.649 2.345 3.521.122 1.08-.17.353-.608.213-.668-.122-1.374-1.925-1.415-2.167-1.143-1.943-.14.08-.674 7.254-.316.37-.729.28-.607-.461-.322-.747.322-1.476.389-1.924.315-1.53.286-1.9.17-.632-.012-.042-.14.018-1.434 1.967-2.18 2.945-1.726 1.845-.414.164-.717-.37.067-.662.401-.589 2.388-3.036 1.44-1.882.93-1.086-.006-.158h-.055L4.132 18.56l-1.13.146-.487-.456.061-.746.231-.243 1.908-1.312-.006.006z",
		fill: "#D97757",
		fillRule: "nonzero"
	})] }));
});
var Color_default$3 = Icon$59;

//#endregion
//#region node_modules/.pnpm/@lobehub+icons@5.16.0_@types+react@18.3.31_react@18.3.1/node_modules/@lobehub/icons/es/Azure/style.js
var TITLE$57 = "Azure";

//#endregion
//#region node_modules/.pnpm/@lobehub+icons@5.16.0_@types+react@18.3.31_react@18.3.1/node_modules/@lobehub/icons/es/Azure/components/Color.js
function _typeof$58(o) {
	"@babel/helpers - typeof";
	return _typeof$58 = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(o$1) {
		return typeof o$1;
	} : function(o$1) {
		return o$1 && "function" == typeof Symbol && o$1.constructor === Symbol && o$1 !== Symbol.prototype ? "symbol" : typeof o$1;
	}, _typeof$58(o);
}
var _excluded$58 = ["size", "style"];
function ownKeys$58(e, r) {
	var t = Object.keys(e);
	if (Object.getOwnPropertySymbols) {
		var o = Object.getOwnPropertySymbols(e);
		r && (o = o.filter(function(r$1) {
			return Object.getOwnPropertyDescriptor(e, r$1).enumerable;
		})), t.push.apply(t, o);
	}
	return t;
}
function _objectSpread$58(e) {
	for (var r = 1; r < arguments.length; r++) {
		var t = null != arguments[r] ? arguments[r] : {};
		r % 2 ? ownKeys$58(Object(t), !0).forEach(function(r$1) {
			_defineProperty$58(e, r$1, t[r$1]);
		}) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys$58(Object(t)).forEach(function(r$1) {
			Object.defineProperty(e, r$1, Object.getOwnPropertyDescriptor(t, r$1));
		});
	}
	return e;
}
function _defineProperty$58(obj, key, value) {
	key = _toPropertyKey$58(key);
	if (key in obj) Object.defineProperty(obj, key, {
		value,
		enumerable: true,
		configurable: true,
		writable: true
	});
	else obj[key] = value;
	return obj;
}
function _toPropertyKey$58(t) {
	var i = _toPrimitive$58(t, "string");
	return "symbol" == _typeof$58(i) ? i : String(i);
}
function _toPrimitive$58(t, r) {
	if ("object" != _typeof$58(t) || !t) return t;
	var e = t[Symbol.toPrimitive];
	if (void 0 !== e) {
		var i = e.call(t, r || "default");
		if ("object" != _typeof$58(i)) return i;
		throw new TypeError("@@toPrimitive must return a primitive value.");
	}
	return ("string" === r ? String : Number)(t);
}
function _slicedToArray$2(arr, i) {
	return _arrayWithHoles$2(arr) || _iterableToArrayLimit$2(arr, i) || _unsupportedIterableToArray$2(arr, i) || _nonIterableRest$2();
}
function _nonIterableRest$2() {
	throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}
function _unsupportedIterableToArray$2(o, minLen) {
	if (!o) return;
	if (typeof o === "string") return _arrayLikeToArray$2(o, minLen);
	var n = Object.prototype.toString.call(o).slice(8, -1);
	if (n === "Object" && o.constructor) n = o.constructor.name;
	if (n === "Map" || n === "Set") return Array.from(o);
	if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray$2(o, minLen);
}
function _arrayLikeToArray$2(arr, len) {
	if (len == null || len > arr.length) len = arr.length;
	for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i];
	return arr2;
}
function _iterableToArrayLimit$2(r, l) {
	var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"];
	if (null != t) {
		var e, n, i, u, a = [], f = !0, o = !1;
		try {
			if (i = (t = t.call(r)).next, 0 === l) {
				if (Object(t) !== t) return;
				f = !1;
			} else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0);
		} catch (r$1) {
			o = !0, n = r$1;
		} finally {
			try {
				if (!f && null != t.return && (u = t.return(), Object(u) !== u)) return;
			} finally {
				if (o) throw n;
			}
		}
		return a;
	}
}
function _arrayWithHoles$2(arr) {
	if (Array.isArray(arr)) return arr;
}
function _objectWithoutProperties$58(source, excluded) {
	if (source == null) return {};
	var target = _objectWithoutPropertiesLoose$58(source, excluded);
	var key, i;
	if (Object.getOwnPropertySymbols) {
		var sourceSymbolKeys = Object.getOwnPropertySymbols(source);
		for (i = 0; i < sourceSymbolKeys.length; i++) {
			key = sourceSymbolKeys[i];
			if (excluded.indexOf(key) >= 0) continue;
			if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue;
			target[key] = source[key];
		}
	}
	return target;
}
function _objectWithoutPropertiesLoose$58(source, excluded) {
	if (source == null) return {};
	var target = {};
	var sourceKeys = Object.keys(source);
	var key, i;
	for (i = 0; i < sourceKeys.length; i++) {
		key = sourceKeys[i];
		if (excluded.indexOf(key) >= 0) continue;
		target[key] = source[key];
	}
	return target;
}
var Icon$58 = /* @__PURE__ */ (0, react.memo)(function(_ref) {
	var _ref$size = _ref.size, size = _ref$size === void 0 ? "1em" : _ref$size, style = _ref.style, rest = _objectWithoutProperties$58(_ref, _excluded$58);
	var _useFillIds2 = _slicedToArray$2(useFillIds(TITLE$57, 3), 3), a = _useFillIds2[0], b = _useFillIds2[1], c = _useFillIds2[2];
	return /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("svg", _objectSpread$58(_objectSpread$58({
		height: size,
		style: _objectSpread$58({
			flex: "none",
			lineHeight: 1
		}, style),
		viewBox: "0 0 24 24",
		width: size,
		xmlns: "http://www.w3.org/2000/svg"
	}, rest), {}, { children: [
		/* @__PURE__ */ (0, react_jsx_runtime.jsx)("title", { children: TITLE$57 }),
		/* @__PURE__ */ (0, react_jsx_runtime.jsx)("path", {
			d: "M7.242 1.613A1.11 1.11 0 018.295.857h6.977L8.03 22.316a1.11 1.11 0 01-1.052.755h-5.43a1.11 1.11 0 01-1.053-1.466L7.242 1.613z",
			fill: a.fill
		}),
		/* @__PURE__ */ (0, react_jsx_runtime.jsx)("path", {
			d: "M18.397 15.296H7.4a.51.51 0 00-.347.882l7.066 6.595c.206.192.477.298.758.298h6.226l-2.706-7.775z",
			fill: "#0078D4"
		}),
		/* @__PURE__ */ (0, react_jsx_runtime.jsx)("path", {
			d: "M15.272.857H7.497L0 23.071h7.775l1.596-4.73 5.068 4.73h6.665l-2.707-7.775h-7.998L15.272.857z",
			fill: b.fill
		}),
		/* @__PURE__ */ (0, react_jsx_runtime.jsx)("path", {
			d: "M17.193 1.613a1.11 1.11 0 00-1.052-.756h-7.81.035c.477 0 .9.304 1.052.756l6.748 19.992a1.11 1.11 0 01-1.052 1.466h-.12 7.895a1.11 1.11 0 001.052-1.466L17.193 1.613z",
			fill: c.fill
		}),
		/* @__PURE__ */ (0, react_jsx_runtime.jsxs)("defs", { children: [
			/* @__PURE__ */ (0, react_jsx_runtime.jsxs)("linearGradient", {
				gradientUnits: "userSpaceOnUse",
				id: a.id,
				x1: "8.247",
				x2: "1.002",
				y1: "1.626",
				y2: "23.03",
				children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)("stop", { stopColor: "#114A8B" }), /* @__PURE__ */ (0, react_jsx_runtime.jsx)("stop", {
					offset: "1",
					stopColor: "#0669BC"
				})]
			}),
			/* @__PURE__ */ (0, react_jsx_runtime.jsxs)("linearGradient", {
				gradientUnits: "userSpaceOnUse",
				id: b.id,
				x1: "14.042",
				x2: "12.324",
				y1: "15.302",
				y2: "15.888",
				children: [
					/* @__PURE__ */ (0, react_jsx_runtime.jsx)("stop", { stopOpacity: ".3" }),
					/* @__PURE__ */ (0, react_jsx_runtime.jsx)("stop", {
						offset: ".071",
						stopOpacity: ".2"
					}),
					/* @__PURE__ */ (0, react_jsx_runtime.jsx)("stop", {
						offset: ".321",
						stopOpacity: ".1"
					}),
					/* @__PURE__ */ (0, react_jsx_runtime.jsx)("stop", {
						offset: ".623",
						stopOpacity: ".05"
					}),
					/* @__PURE__ */ (0, react_jsx_runtime.jsx)("stop", {
						offset: "1",
						stopOpacity: "0"
					})
				]
			}),
			/* @__PURE__ */ (0, react_jsx_runtime.jsxs)("linearGradient", {
				gradientUnits: "userSpaceOnUse",
				id: c.id,
				x1: "12.841",
				x2: "20.793",
				y1: "1.626",
				y2: "22.814",
				children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)("stop", { stopColor: "#3CCBF4" }), /* @__PURE__ */ (0, react_jsx_runtime.jsx)("stop", {
					offset: "1",
					stopColor: "#2892DF"
				})]
			})
		] })
	] }));
});
var Color_default$4 = Icon$58;

//#endregion
//#region node_modules/.pnpm/@lobehub+icons@5.16.0_@types+react@18.3.31_react@18.3.1/node_modules/@lobehub/icons/es/Baichuan/style.js
var TITLE$56 = "Baichuan";

//#endregion
//#region node_modules/.pnpm/@lobehub+icons@5.16.0_@types+react@18.3.31_react@18.3.1/node_modules/@lobehub/icons/es/Baichuan/components/Color.js
function _typeof$57(o) {
	"@babel/helpers - typeof";
	return _typeof$57 = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(o$1) {
		return typeof o$1;
	} : function(o$1) {
		return o$1 && "function" == typeof Symbol && o$1.constructor === Symbol && o$1 !== Symbol.prototype ? "symbol" : typeof o$1;
	}, _typeof$57(o);
}
var _excluded$57 = ["size", "style"];
function ownKeys$57(e, r) {
	var t = Object.keys(e);
	if (Object.getOwnPropertySymbols) {
		var o = Object.getOwnPropertySymbols(e);
		r && (o = o.filter(function(r$1) {
			return Object.getOwnPropertyDescriptor(e, r$1).enumerable;
		})), t.push.apply(t, o);
	}
	return t;
}
function _objectSpread$57(e) {
	for (var r = 1; r < arguments.length; r++) {
		var t = null != arguments[r] ? arguments[r] : {};
		r % 2 ? ownKeys$57(Object(t), !0).forEach(function(r$1) {
			_defineProperty$57(e, r$1, t[r$1]);
		}) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys$57(Object(t)).forEach(function(r$1) {
			Object.defineProperty(e, r$1, Object.getOwnPropertyDescriptor(t, r$1));
		});
	}
	return e;
}
function _defineProperty$57(obj, key, value) {
	key = _toPropertyKey$57(key);
	if (key in obj) Object.defineProperty(obj, key, {
		value,
		enumerable: true,
		configurable: true,
		writable: true
	});
	else obj[key] = value;
	return obj;
}
function _toPropertyKey$57(t) {
	var i = _toPrimitive$57(t, "string");
	return "symbol" == _typeof$57(i) ? i : String(i);
}
function _toPrimitive$57(t, r) {
	if ("object" != _typeof$57(t) || !t) return t;
	var e = t[Symbol.toPrimitive];
	if (void 0 !== e) {
		var i = e.call(t, r || "default");
		if ("object" != _typeof$57(i)) return i;
		throw new TypeError("@@toPrimitive must return a primitive value.");
	}
	return ("string" === r ? String : Number)(t);
}
function _objectWithoutProperties$57(source, excluded) {
	if (source == null) return {};
	var target = _objectWithoutPropertiesLoose$57(source, excluded);
	var key, i;
	if (Object.getOwnPropertySymbols) {
		var sourceSymbolKeys = Object.getOwnPropertySymbols(source);
		for (i = 0; i < sourceSymbolKeys.length; i++) {
			key = sourceSymbolKeys[i];
			if (excluded.indexOf(key) >= 0) continue;
			if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue;
			target[key] = source[key];
		}
	}
	return target;
}
function _objectWithoutPropertiesLoose$57(source, excluded) {
	if (source == null) return {};
	var target = {};
	var sourceKeys = Object.keys(source);
	var key, i;
	for (i = 0; i < sourceKeys.length; i++) {
		key = sourceKeys[i];
		if (excluded.indexOf(key) >= 0) continue;
		target[key] = source[key];
	}
	return target;
}
var Icon$57 = /* @__PURE__ */ (0, react.memo)(function(_ref) {
	var _ref$size = _ref.size, size = _ref$size === void 0 ? "1em" : _ref$size, style = _ref.style, rest = _objectWithoutProperties$57(_ref, _excluded$57);
	var _useFillId = useFillId(TITLE$56), id = _useFillId.id, fill = _useFillId.fill;
	return /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("svg", _objectSpread$57(_objectSpread$57({
		height: size,
		style: _objectSpread$57({
			flex: "none",
			lineHeight: 1
		}, style),
		viewBox: "0 0 24 24",
		width: size,
		xmlns: "http://www.w3.org/2000/svg"
	}, rest), {}, { children: [
		/* @__PURE__ */ (0, react_jsx_runtime.jsx)("title", { children: TITLE$56 }),
		/* @__PURE__ */ (0, react_jsx_runtime.jsx)("defs", { children: /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("linearGradient", {
			id,
			x1: "17.764%",
			x2: "100%",
			y1: "8.678%",
			y2: "91.322%",
			children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)("stop", {
				offset: "0%",
				stopColor: "#FEC13E"
			}), /* @__PURE__ */ (0, react_jsx_runtime.jsx)("stop", {
				offset: "100%",
				stopColor: "#FF6933"
			})]
		}) }),
		/* @__PURE__ */ (0, react_jsx_runtime.jsx)("path", {
			d: "M7.333 2h-3.2l-2 4.333V17.8L0 22h5.2l2.028-4.2L7.333 2zm7.334 0h-5.2v20h5.2V2zM16.8 7.733H22V22h-5.2V7.733zM22 2h-5.2v4.133H22V2z",
			fill,
			fillRule: "nonzero"
		})
	] }));
});
var Color_default$5 = Icon$57;

//#endregion
//#region node_modules/.pnpm/@lobehub+icons@5.16.0_@types+react@18.3.31_react@18.3.1/node_modules/@lobehub/icons/es/Bailian/style.js
var TITLE$55 = "BaiLian";

//#endregion
//#region node_modules/.pnpm/@lobehub+icons@5.16.0_@types+react@18.3.31_react@18.3.1/node_modules/@lobehub/icons/es/Bailian/components/Color.js
function _typeof$56(o) {
	"@babel/helpers - typeof";
	return _typeof$56 = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(o$1) {
		return typeof o$1;
	} : function(o$1) {
		return o$1 && "function" == typeof Symbol && o$1.constructor === Symbol && o$1 !== Symbol.prototype ? "symbol" : typeof o$1;
	}, _typeof$56(o);
}
var _excluded$56 = ["size", "style"];
function ownKeys$56(e, r) {
	var t = Object.keys(e);
	if (Object.getOwnPropertySymbols) {
		var o = Object.getOwnPropertySymbols(e);
		r && (o = o.filter(function(r$1) {
			return Object.getOwnPropertyDescriptor(e, r$1).enumerable;
		})), t.push.apply(t, o);
	}
	return t;
}
function _objectSpread$56(e) {
	for (var r = 1; r < arguments.length; r++) {
		var t = null != arguments[r] ? arguments[r] : {};
		r % 2 ? ownKeys$56(Object(t), !0).forEach(function(r$1) {
			_defineProperty$56(e, r$1, t[r$1]);
		}) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys$56(Object(t)).forEach(function(r$1) {
			Object.defineProperty(e, r$1, Object.getOwnPropertyDescriptor(t, r$1));
		});
	}
	return e;
}
function _defineProperty$56(obj, key, value) {
	key = _toPropertyKey$56(key);
	if (key in obj) Object.defineProperty(obj, key, {
		value,
		enumerable: true,
		configurable: true,
		writable: true
	});
	else obj[key] = value;
	return obj;
}
function _toPropertyKey$56(t) {
	var i = _toPrimitive$56(t, "string");
	return "symbol" == _typeof$56(i) ? i : String(i);
}
function _toPrimitive$56(t, r) {
	if ("object" != _typeof$56(t) || !t) return t;
	var e = t[Symbol.toPrimitive];
	if (void 0 !== e) {
		var i = e.call(t, r || "default");
		if ("object" != _typeof$56(i)) return i;
		throw new TypeError("@@toPrimitive must return a primitive value.");
	}
	return ("string" === r ? String : Number)(t);
}
function _objectWithoutProperties$56(source, excluded) {
	if (source == null) return {};
	var target = _objectWithoutPropertiesLoose$56(source, excluded);
	var key, i;
	if (Object.getOwnPropertySymbols) {
		var sourceSymbolKeys = Object.getOwnPropertySymbols(source);
		for (i = 0; i < sourceSymbolKeys.length; i++) {
			key = sourceSymbolKeys[i];
			if (excluded.indexOf(key) >= 0) continue;
			if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue;
			target[key] = source[key];
		}
	}
	return target;
}
function _objectWithoutPropertiesLoose$56(source, excluded) {
	if (source == null) return {};
	var target = {};
	var sourceKeys = Object.keys(source);
	var key, i;
	for (i = 0; i < sourceKeys.length; i++) {
		key = sourceKeys[i];
		if (excluded.indexOf(key) >= 0) continue;
		target[key] = source[key];
	}
	return target;
}
var Icon$56 = /* @__PURE__ */ (0, react.memo)(function(_ref) {
	var _ref$size = _ref.size, size = _ref$size === void 0 ? "1em" : _ref$size, style = _ref.style, rest = _objectWithoutProperties$56(_ref, _excluded$56);
	return /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("svg", _objectSpread$56(_objectSpread$56({
		height: size,
		style: _objectSpread$56({
			flex: "none",
			lineHeight: 1
		}, style),
		viewBox: "0 0 24 24",
		width: size,
		xmlns: "http://www.w3.org/2000/svg"
	}, rest), {}, { children: [
		/* @__PURE__ */ (0, react_jsx_runtime.jsx)("title", { children: TITLE$55 }),
		/* @__PURE__ */ (0, react_jsx_runtime.jsx)("path", {
			d: "M6.336 8.919v6.162l5.335-3.083L6.337 8.92z",
			fill: "#1C54E3"
		}),
		/* @__PURE__ */ (0, react_jsx_runtime.jsx)("path", {
			d: "M21.394 5.288s-.006-.006-.01-.006L17.01 2.754 6.336 8.92l5.335 3.082 9.701-5.6.016-.01a.635.635 0 00.006-1.1v-.003z",
			fill: "#AA9AFF"
		}),
		/* @__PURE__ */ (0, react_jsx_runtime.jsx)("path", {
			d: "M21.71 12.465a.62.62 0 00-.316.085s-.006 0-.009.003l-4.375 2.528 5.05 2.915h.006a2.06 2.06 0 00.28-1.04v-3.855a.637.637 0 00-.636-.636z",
			fill: "#00EAD1"
		}),
		/* @__PURE__ */ (0, react_jsx_runtime.jsx)("path", {
			d: "M22.06 17.996l-5.05-2.915L6.34 21.242l4.27 2.465s.016.006.022.012a2.102 2.102 0 002.093 0c.006-.003.016-.006.022-.012l8.538-4.93c.003 0 .006-.003.01-.006.321-.183.589-.45.775-.772h-.006l-.004-.003z",
			fill: "#00CEC9"
		}),
		/* @__PURE__ */ (0, react_jsx_runtime.jsx)("path", {
			d: "M11.672 11.998l-5.336 3.083-1.444.832-3.605 2.083H1.28c.173.303.416.555.709.738l.078.044.016.01.02.012 4.232 2.442 10.671-6.161-5.335-3.082z",
			fill: "#00EAD1"
		}),
		/* @__PURE__ */ (0, react_jsx_runtime.jsx)("path", {
			d: "M12.74.29c-.1-.06-.208-.107-.315-.148-.02-.006-.038-.016-.057-.022a2.121 2.121 0 00-.7-.12c-.233 0-.457.038-.668.11l-.031.01a2.196 2.196 0 00-.372.17L2.068 5.222s-.003 0-.006.003c-.324.183-.592.451-.781.773h.006l5.049 2.918L17.01 2.758 12.74.29z",
			fill: "#7347FF"
		}),
		/* @__PURE__ */ (0, react_jsx_runtime.jsx)("path", {
			d: "M1.287 6.001H1.28A2.06 2.06 0 001 7.041v9.915c0 .378.1.735.28 1.043h.007l5.049-2.918V8.919l-5.05-2.918z",
			fill: "#0423DA"
		})
	] }));
});
var Color_default$6 = Icon$56;

//#endregion
//#region node_modules/.pnpm/@lobehub+icons@5.16.0_@types+react@18.3.31_react@18.3.1/node_modules/@lobehub/icons/es/Baseten/style.js
var TITLE$54 = "Baseten";

//#endregion
//#region node_modules/.pnpm/@lobehub+icons@5.16.0_@types+react@18.3.31_react@18.3.1/node_modules/@lobehub/icons/es/Baseten/components/Mono.js
function _typeof$55(o) {
	"@babel/helpers - typeof";
	return _typeof$55 = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(o$1) {
		return typeof o$1;
	} : function(o$1) {
		return o$1 && "function" == typeof Symbol && o$1.constructor === Symbol && o$1 !== Symbol.prototype ? "symbol" : typeof o$1;
	}, _typeof$55(o);
}
var _excluded$55 = ["size", "style"];
function ownKeys$55(e, r) {
	var t = Object.keys(e);
	if (Object.getOwnPropertySymbols) {
		var o = Object.getOwnPropertySymbols(e);
		r && (o = o.filter(function(r$1) {
			return Object.getOwnPropertyDescriptor(e, r$1).enumerable;
		})), t.push.apply(t, o);
	}
	return t;
}
function _objectSpread$55(e) {
	for (var r = 1; r < arguments.length; r++) {
		var t = null != arguments[r] ? arguments[r] : {};
		r % 2 ? ownKeys$55(Object(t), !0).forEach(function(r$1) {
			_defineProperty$55(e, r$1, t[r$1]);
		}) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys$55(Object(t)).forEach(function(r$1) {
			Object.defineProperty(e, r$1, Object.getOwnPropertyDescriptor(t, r$1));
		});
	}
	return e;
}
function _defineProperty$55(obj, key, value) {
	key = _toPropertyKey$55(key);
	if (key in obj) Object.defineProperty(obj, key, {
		value,
		enumerable: true,
		configurable: true,
		writable: true
	});
	else obj[key] = value;
	return obj;
}
function _toPropertyKey$55(t) {
	var i = _toPrimitive$55(t, "string");
	return "symbol" == _typeof$55(i) ? i : String(i);
}
function _toPrimitive$55(t, r) {
	if ("object" != _typeof$55(t) || !t) return t;
	var e = t[Symbol.toPrimitive];
	if (void 0 !== e) {
		var i = e.call(t, r || "default");
		if ("object" != _typeof$55(i)) return i;
		throw new TypeError("@@toPrimitive must return a primitive value.");
	}
	return ("string" === r ? String : Number)(t);
}
function _objectWithoutProperties$55(source, excluded) {
	if (source == null) return {};
	var target = _objectWithoutPropertiesLoose$55(source, excluded);
	var key, i;
	if (Object.getOwnPropertySymbols) {
		var sourceSymbolKeys = Object.getOwnPropertySymbols(source);
		for (i = 0; i < sourceSymbolKeys.length; i++) {
			key = sourceSymbolKeys[i];
			if (excluded.indexOf(key) >= 0) continue;
			if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue;
			target[key] = source[key];
		}
	}
	return target;
}
function _objectWithoutPropertiesLoose$55(source, excluded) {
	if (source == null) return {};
	var target = {};
	var sourceKeys = Object.keys(source);
	var key, i;
	for (i = 0; i < sourceKeys.length; i++) {
		key = sourceKeys[i];
		if (excluded.indexOf(key) >= 0) continue;
		target[key] = source[key];
	}
	return target;
}
var Icon$55 = /* @__PURE__ */ (0, react.memo)(function(_ref) {
	var _ref$size = _ref.size, size = _ref$size === void 0 ? "1em" : _ref$size, style = _ref.style, rest = _objectWithoutProperties$55(_ref, _excluded$55);
	return /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("svg", _objectSpread$55(_objectSpread$55({
		fill: "currentColor",
		fillRule: "evenodd",
		height: size,
		style: _objectSpread$55({
			flex: "none",
			lineHeight: 1
		}, style),
		viewBox: "0 0 24 24",
		width: size,
		xmlns: "http://www.w3.org/2000/svg"
	}, rest), {}, { children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)("title", { children: TITLE$54 }), /* @__PURE__ */ (0, react_jsx_runtime.jsx)("path", { d: "M2.316 4.8h14.682v4.8H7.31a.302.302 0 00-.308.3v4.2c0 .171.14.3.308.3h9.688v4.8h-4.686a.302.302 0 00-.308.3v4.2c0 .171.141.3.308.3h4.378a.297.297 0 00.308-.3v-4.5h4.694a.302.302 0 00.308-.3v-4.2c0-.171-.14-.3-.308-.3h-4.694V9.6h4.694A.302.302 0 0022 9.3V5.1c0-.171-.14-.3-.308-.3h-4.694V.3c0-.171-.14-.3-.308-.3H2.316A.31.31 0 002 .3v4.2c0 .171.14.3.316.3z" })] }));
});
var Mono_default = Icon$55;

//#endregion
//#region node_modules/.pnpm/@lobehub+icons@5.16.0_@types+react@18.3.31_react@18.3.1/node_modules/@lobehub/icons/es/Bedrock/style.js
var TITLE$53 = "Bedrock";

//#endregion
//#region node_modules/.pnpm/@lobehub+icons@5.16.0_@types+react@18.3.31_react@18.3.1/node_modules/@lobehub/icons/es/Bedrock/components/Color.js
function _typeof$54(o) {
	"@babel/helpers - typeof";
	return _typeof$54 = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(o$1) {
		return typeof o$1;
	} : function(o$1) {
		return o$1 && "function" == typeof Symbol && o$1.constructor === Symbol && o$1 !== Symbol.prototype ? "symbol" : typeof o$1;
	}, _typeof$54(o);
}
var _excluded$54 = ["size", "style"];
function ownKeys$54(e, r) {
	var t = Object.keys(e);
	if (Object.getOwnPropertySymbols) {
		var o = Object.getOwnPropertySymbols(e);
		r && (o = o.filter(function(r$1) {
			return Object.getOwnPropertyDescriptor(e, r$1).enumerable;
		})), t.push.apply(t, o);
	}
	return t;
}
function _objectSpread$54(e) {
	for (var r = 1; r < arguments.length; r++) {
		var t = null != arguments[r] ? arguments[r] : {};
		r % 2 ? ownKeys$54(Object(t), !0).forEach(function(r$1) {
			_defineProperty$54(e, r$1, t[r$1]);
		}) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys$54(Object(t)).forEach(function(r$1) {
			Object.defineProperty(e, r$1, Object.getOwnPropertyDescriptor(t, r$1));
		});
	}
	return e;
}
function _defineProperty$54(obj, key, value) {
	key = _toPropertyKey$54(key);
	if (key in obj) Object.defineProperty(obj, key, {
		value,
		enumerable: true,
		configurable: true,
		writable: true
	});
	else obj[key] = value;
	return obj;
}
function _toPropertyKey$54(t) {
	var i = _toPrimitive$54(t, "string");
	return "symbol" == _typeof$54(i) ? i : String(i);
}
function _toPrimitive$54(t, r) {
	if ("object" != _typeof$54(t) || !t) return t;
	var e = t[Symbol.toPrimitive];
	if (void 0 !== e) {
		var i = e.call(t, r || "default");
		if ("object" != _typeof$54(i)) return i;
		throw new TypeError("@@toPrimitive must return a primitive value.");
	}
	return ("string" === r ? String : Number)(t);
}
function _objectWithoutProperties$54(source, excluded) {
	if (source == null) return {};
	var target = _objectWithoutPropertiesLoose$54(source, excluded);
	var key, i;
	if (Object.getOwnPropertySymbols) {
		var sourceSymbolKeys = Object.getOwnPropertySymbols(source);
		for (i = 0; i < sourceSymbolKeys.length; i++) {
			key = sourceSymbolKeys[i];
			if (excluded.indexOf(key) >= 0) continue;
			if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue;
			target[key] = source[key];
		}
	}
	return target;
}
function _objectWithoutPropertiesLoose$54(source, excluded) {
	if (source == null) return {};
	var target = {};
	var sourceKeys = Object.keys(source);
	var key, i;
	for (i = 0; i < sourceKeys.length; i++) {
		key = sourceKeys[i];
		if (excluded.indexOf(key) >= 0) continue;
		target[key] = source[key];
	}
	return target;
}
var Icon$54 = /* @__PURE__ */ (0, react.memo)(function(_ref) {
	var _ref$size = _ref.size, size = _ref$size === void 0 ? "1em" : _ref$size, style = _ref.style, rest = _objectWithoutProperties$54(_ref, _excluded$54);
	var _useFillId = useFillId(TITLE$53), id = _useFillId.id, fill = _useFillId.fill;
	return /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("svg", _objectSpread$54(_objectSpread$54({
		height: size,
		style: _objectSpread$54({
			flex: "none",
			lineHeight: 1
		}, style),
		viewBox: "0 0 24 24",
		width: size,
		xmlns: "http://www.w3.org/2000/svg"
	}, rest), {}, { children: [
		/* @__PURE__ */ (0, react_jsx_runtime.jsx)("title", { children: TITLE$53 }),
		/* @__PURE__ */ (0, react_jsx_runtime.jsx)("defs", { children: /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("linearGradient", {
			id,
			x1: "80%",
			x2: "20%",
			y1: "20%",
			y2: "80%",
			children: [
				/* @__PURE__ */ (0, react_jsx_runtime.jsx)("stop", {
					offset: "0%",
					stopColor: "#6350FB"
				}),
				/* @__PURE__ */ (0, react_jsx_runtime.jsx)("stop", {
					offset: "50%",
					stopColor: "#3D8FFF"
				}),
				/* @__PURE__ */ (0, react_jsx_runtime.jsx)("stop", {
					offset: "100%",
					stopColor: "#9AD8F8"
				})
			]
		}) }),
		/* @__PURE__ */ (0, react_jsx_runtime.jsx)("path", {
			d: "M13.05 15.513h3.08c.214 0 .389.177.389.394v1.82a1.704 1.704 0 011.296 1.661c0 .943-.755 1.708-1.685 1.708-.931 0-1.686-.765-1.686-1.708 0-.807.554-1.484 1.297-1.662v-1.425h-2.69v4.663a.395.395 0 01-.188.338l-2.69 1.641a.385.385 0 01-.405-.002l-4.926-3.086a.395.395 0 01-.185-.336V16.3L2.196 14.87A.395.395 0 012 14.555L2 14.528V9.406c0-.14.073-.27.192-.34l2.465-1.462V4.448c0-.129.062-.249.165-.322l.021-.014L9.77 1.058a.385.385 0 01.407 0l2.69 1.675a.395.395 0 01.185.336V7.6h3.856V5.683a1.704 1.704 0 01-1.296-1.662c0-.943.755-1.708 1.685-1.708.931 0 1.685.765 1.685 1.708 0 .807-.553 1.484-1.296 1.662v2.311a.391.391 0 01-.389.394h-4.245v1.806h6.624a1.69 1.69 0 011.64-1.313c.93 0 1.685.764 1.685 1.707 0 .943-.754 1.708-1.685 1.708a1.69 1.69 0 01-1.64-1.314H13.05v1.937h4.953l.915 1.18a1.66 1.66 0 01.84-.227c.931 0 1.685.764 1.685 1.707 0 .943-.754 1.708-1.685 1.708-.93 0-1.685-.765-1.685-1.708 0-.346.102-.668.276-.937l-.724-.935H13.05v1.806zM9.973 1.856L7.93 3.122V6.09h-.778V3.604L5.435 4.669v2.945l2.11 1.36L9.712 7.61V5.334h.778V7.83c0 .136-.07.263-.184.335L7.963 9.638v2.081l1.422 1.009-.446.646-1.406-.998-1.53 1.005-.423-.66 1.605-1.055v-1.99L5.038 8.29l-2.26 1.34v1.676l1.972-1.189.398.677-2.37 1.429V14.3l2.166 1.258 2.27-1.368.397.677-2.176 1.311V19.3l1.876 1.175 2.365-1.426.398.678-2.017 1.216 1.918 1.201 2.298-1.403v-5.78l-4.758 2.893-.4-.675 5.158-3.136V3.289L9.972 1.856zM16.13 18.47a.913.913 0 00-.908.92c0 .507.406.918.908.918a.913.913 0 00.907-.919.913.913 0 00-.907-.92zm3.63-3.81a.913.913 0 00-.908.92c0 .508.406.92.907.92a.913.913 0 00.908-.92.913.913 0 00-.908-.92zm1.555-4.99a.913.913 0 00-.908.92c0 .507.407.918.908.918a.913.913 0 00.907-.919.913.913 0 00-.907-.92zM17.296 3.1a.913.913 0 00-.907.92c0 .508.406.92.907.92a.913.913 0 00.908-.92.913.913 0 00-.908-.92z",
			fill,
			fillRule: "nonzero"
		})
	] }));
});
var Color_default$7 = Icon$54;

//#endregion
//#region node_modules/.pnpm/@lobehub+icons@5.16.0_@types+react@18.3.31_react@18.3.1/node_modules/@lobehub/icons/es/Cerebras/style.js
var TITLE$52 = "Cerebras";

//#endregion
//#region node_modules/.pnpm/@lobehub+icons@5.16.0_@types+react@18.3.31_react@18.3.1/node_modules/@lobehub/icons/es/Cerebras/components/Color.js
function _typeof$53(o) {
	"@babel/helpers - typeof";
	return _typeof$53 = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(o$1) {
		return typeof o$1;
	} : function(o$1) {
		return o$1 && "function" == typeof Symbol && o$1.constructor === Symbol && o$1 !== Symbol.prototype ? "symbol" : typeof o$1;
	}, _typeof$53(o);
}
var _excluded$53 = ["size", "style"];
function ownKeys$53(e, r) {
	var t = Object.keys(e);
	if (Object.getOwnPropertySymbols) {
		var o = Object.getOwnPropertySymbols(e);
		r && (o = o.filter(function(r$1) {
			return Object.getOwnPropertyDescriptor(e, r$1).enumerable;
		})), t.push.apply(t, o);
	}
	return t;
}
function _objectSpread$53(e) {
	for (var r = 1; r < arguments.length; r++) {
		var t = null != arguments[r] ? arguments[r] : {};
		r % 2 ? ownKeys$53(Object(t), !0).forEach(function(r$1) {
			_defineProperty$53(e, r$1, t[r$1]);
		}) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys$53(Object(t)).forEach(function(r$1) {
			Object.defineProperty(e, r$1, Object.getOwnPropertyDescriptor(t, r$1));
		});
	}
	return e;
}
function _defineProperty$53(obj, key, value) {
	key = _toPropertyKey$53(key);
	if (key in obj) Object.defineProperty(obj, key, {
		value,
		enumerable: true,
		configurable: true,
		writable: true
	});
	else obj[key] = value;
	return obj;
}
function _toPropertyKey$53(t) {
	var i = _toPrimitive$53(t, "string");
	return "symbol" == _typeof$53(i) ? i : String(i);
}
function _toPrimitive$53(t, r) {
	if ("object" != _typeof$53(t) || !t) return t;
	var e = t[Symbol.toPrimitive];
	if (void 0 !== e) {
		var i = e.call(t, r || "default");
		if ("object" != _typeof$53(i)) return i;
		throw new TypeError("@@toPrimitive must return a primitive value.");
	}
	return ("string" === r ? String : Number)(t);
}
function _objectWithoutProperties$53(source, excluded) {
	if (source == null) return {};
	var target = _objectWithoutPropertiesLoose$53(source, excluded);
	var key, i;
	if (Object.getOwnPropertySymbols) {
		var sourceSymbolKeys = Object.getOwnPropertySymbols(source);
		for (i = 0; i < sourceSymbolKeys.length; i++) {
			key = sourceSymbolKeys[i];
			if (excluded.indexOf(key) >= 0) continue;
			if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue;
			target[key] = source[key];
		}
	}
	return target;
}
function _objectWithoutPropertiesLoose$53(source, excluded) {
	if (source == null) return {};
	var target = {};
	var sourceKeys = Object.keys(source);
	var key, i;
	for (i = 0; i < sourceKeys.length; i++) {
		key = sourceKeys[i];
		if (excluded.indexOf(key) >= 0) continue;
		target[key] = source[key];
	}
	return target;
}
var Icon$53 = /* @__PURE__ */ (0, react.memo)(function(_ref) {
	var _ref$size = _ref.size, size = _ref$size === void 0 ? "1em" : _ref$size, style = _ref.style, rest = _objectWithoutProperties$53(_ref, _excluded$53);
	return /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("svg", _objectSpread$53(_objectSpread$53({
		fill: "currentColor",
		height: size,
		style: _objectSpread$53({
			flex: "none",
			lineHeight: 1
		}, style),
		viewBox: "0 0 24 24",
		width: size,
		xmlns: "http://www.w3.org/2000/svg"
	}, rest), {}, { children: [
		/* @__PURE__ */ (0, react_jsx_runtime.jsx)("title", { children: TITLE$52 }),
		/* @__PURE__ */ (0, react_jsx_runtime.jsx)("path", {
			clipRule: "evenodd",
			d: "M14.121 2.701a9.299 9.299 0 000 18.598V22.7c-5.91 0-10.7-4.791-10.7-10.701S8.21 1.299 14.12 1.299V2.7zm4.752 3.677A7.353 7.353 0 109.42 17.643l-.901 1.074a8.754 8.754 0 01-1.08-12.334 8.755 8.755 0 0112.335-1.08l-.901 1.075zm-2.255.844a5.407 5.407 0 00-5.048 9.563l-.656 1.24a6.81 6.81 0 016.358-12.043l-.654 1.24zM14.12 8.539a3.46 3.46 0 100 6.922v1.402a4.863 4.863 0 010-9.726v1.402z",
			fill: "#F15A29",
			fillRule: "evenodd"
		}),
		/* @__PURE__ */ (0, react_jsx_runtime.jsx)("path", { d: "M15.407 10.836a2.24 2.24 0 00-.51-.409 1.084 1.084 0 00-.544-.152c-.255 0-.483.047-.684.14a1.58 1.58 0 00-.84.912c-.074.203-.11.416-.11.631 0 .218.036.43.11.631a1.594 1.594 0 00.84.913c.2.093.43.14.684.14.216 0 .417-.046.602-.135.188-.09.35-.225.475-.392l.928 1.006c-.14.14-.3.261-.482.363a3.367 3.367 0 01-1.083.38c-.17.026-.317.04-.44.04a3.315 3.315 0 01-1.182-.21 2.825 2.825 0 01-.961-.597 2.816 2.816 0 01-.644-.929 2.987 2.987 0 01-.238-1.21c0-.444.08-.847.238-1.21.15-.35.368-.666.643-.929.278-.261.605-.464.962-.596a3.315 3.315 0 011.182-.21c.355 0 .712.068 1.072.204.361.138.685.36.944.649l-.962.97z" })
	] }));
});
var Color_default$8 = Icon$53;

//#endregion
//#region node_modules/.pnpm/@lobehub+icons@5.16.0_@types+react@18.3.31_react@18.3.1/node_modules/@lobehub/icons/es/Cloudflare/style.js
var TITLE$51 = "Cloudflare";

//#endregion
//#region node_modules/.pnpm/@lobehub+icons@5.16.0_@types+react@18.3.31_react@18.3.1/node_modules/@lobehub/icons/es/Cloudflare/components/Color.js
function _typeof$52(o) {
	"@babel/helpers - typeof";
	return _typeof$52 = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(o$1) {
		return typeof o$1;
	} : function(o$1) {
		return o$1 && "function" == typeof Symbol && o$1.constructor === Symbol && o$1 !== Symbol.prototype ? "symbol" : typeof o$1;
	}, _typeof$52(o);
}
var _excluded$52 = ["size", "style"];
function ownKeys$52(e, r) {
	var t = Object.keys(e);
	if (Object.getOwnPropertySymbols) {
		var o = Object.getOwnPropertySymbols(e);
		r && (o = o.filter(function(r$1) {
			return Object.getOwnPropertyDescriptor(e, r$1).enumerable;
		})), t.push.apply(t, o);
	}
	return t;
}
function _objectSpread$52(e) {
	for (var r = 1; r < arguments.length; r++) {
		var t = null != arguments[r] ? arguments[r] : {};
		r % 2 ? ownKeys$52(Object(t), !0).forEach(function(r$1) {
			_defineProperty$52(e, r$1, t[r$1]);
		}) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys$52(Object(t)).forEach(function(r$1) {
			Object.defineProperty(e, r$1, Object.getOwnPropertyDescriptor(t, r$1));
		});
	}
	return e;
}
function _defineProperty$52(obj, key, value) {
	key = _toPropertyKey$52(key);
	if (key in obj) Object.defineProperty(obj, key, {
		value,
		enumerable: true,
		configurable: true,
		writable: true
	});
	else obj[key] = value;
	return obj;
}
function _toPropertyKey$52(t) {
	var i = _toPrimitive$52(t, "string");
	return "symbol" == _typeof$52(i) ? i : String(i);
}
function _toPrimitive$52(t, r) {
	if ("object" != _typeof$52(t) || !t) return t;
	var e = t[Symbol.toPrimitive];
	if (void 0 !== e) {
		var i = e.call(t, r || "default");
		if ("object" != _typeof$52(i)) return i;
		throw new TypeError("@@toPrimitive must return a primitive value.");
	}
	return ("string" === r ? String : Number)(t);
}
function _objectWithoutProperties$52(source, excluded) {
	if (source == null) return {};
	var target = _objectWithoutPropertiesLoose$52(source, excluded);
	var key, i;
	if (Object.getOwnPropertySymbols) {
		var sourceSymbolKeys = Object.getOwnPropertySymbols(source);
		for (i = 0; i < sourceSymbolKeys.length; i++) {
			key = sourceSymbolKeys[i];
			if (excluded.indexOf(key) >= 0) continue;
			if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue;
			target[key] = source[key];
		}
	}
	return target;
}
function _objectWithoutPropertiesLoose$52(source, excluded) {
	if (source == null) return {};
	var target = {};
	var sourceKeys = Object.keys(source);
	var key, i;
	for (i = 0; i < sourceKeys.length; i++) {
		key = sourceKeys[i];
		if (excluded.indexOf(key) >= 0) continue;
		target[key] = source[key];
	}
	return target;
}
var Icon$52 = /* @__PURE__ */ (0, react.memo)(function(_ref) {
	var _ref$size = _ref.size, size = _ref$size === void 0 ? "1em" : _ref$size, style = _ref.style, rest = _objectWithoutProperties$52(_ref, _excluded$52);
	return /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("svg", _objectSpread$52(_objectSpread$52({
		height: size,
		style: _objectSpread$52({
			flex: "none",
			lineHeight: 1
		}, style),
		viewBox: "0 0 24 24",
		width: size,
		xmlns: "http://www.w3.org/2000/svg"
	}, rest), {}, { children: [
		/* @__PURE__ */ (0, react_jsx_runtime.jsx)("title", { children: TITLE$51 }),
		/* @__PURE__ */ (0, react_jsx_runtime.jsx)("path", {
			d: "M16.493 17.4c.135-.52.08-.983-.161-1.338-.215-.328-.592-.519-1.05-.519l-8.663-.109a.148.148 0 01-.135-.082c-.027-.054-.027-.109-.027-.163.027-.082.108-.164.189-.164l8.744-.11c1.05-.054 2.153-.9 2.556-1.937l.511-1.31c.027-.055.027-.11.027-.164C17.92 8.91 15.66 7 12.942 7c-2.503 0-4.628 1.638-5.381 3.903a2.432 2.432 0 00-1.803-.491c-1.21.109-2.153 1.092-2.287 2.32-.027.328 0 .628.054.9C1.56 13.688 0 15.326 0 17.319c0 .19.027.355.027.545 0 .082.08.137.161.137h15.983c.08 0 .188-.055.215-.164l.107-.437",
			fill: "#F38020"
		}),
		/* @__PURE__ */ (0, react_jsx_runtime.jsx)("path", {
			d: "M19.238 11.75h-.242c-.054 0-.108.054-.135.109l-.35 1.2c-.134.52-.08.983.162 1.338.215.328.592.518 1.05.518l1.855.11c.054 0 .108.027.135.082.027.054.027.109.027.163-.027.082-.108.164-.188.164l-1.91.11c-1.05.054-2.153.9-2.557 1.937l-.134.355c-.027.055.026.137.107.137h6.592c.081 0 .162-.055.162-.137.107-.41.188-.846.188-1.31-.027-2.62-2.153-4.777-4.762-4.777",
			fill: "#FCAD32"
		})
	] }));
});
var Color_default$9 = Icon$52;

//#endregion
//#region node_modules/.pnpm/@lobehub+icons@5.16.0_@types+react@18.3.31_react@18.3.1/node_modules/@lobehub/icons/es/Codex/style.js
var TITLE$50 = "Codex";

//#endregion
//#region node_modules/.pnpm/@lobehub+icons@5.16.0_@types+react@18.3.31_react@18.3.1/node_modules/@lobehub/icons/es/Codex/components/Color.js
function _typeof$51(o) {
	"@babel/helpers - typeof";
	return _typeof$51 = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(o$1) {
		return typeof o$1;
	} : function(o$1) {
		return o$1 && "function" == typeof Symbol && o$1.constructor === Symbol && o$1 !== Symbol.prototype ? "symbol" : typeof o$1;
	}, _typeof$51(o);
}
var _excluded$51 = ["size", "style"];
function ownKeys$51(e, r) {
	var t = Object.keys(e);
	if (Object.getOwnPropertySymbols) {
		var o = Object.getOwnPropertySymbols(e);
		r && (o = o.filter(function(r$1) {
			return Object.getOwnPropertyDescriptor(e, r$1).enumerable;
		})), t.push.apply(t, o);
	}
	return t;
}
function _objectSpread$51(e) {
	for (var r = 1; r < arguments.length; r++) {
		var t = null != arguments[r] ? arguments[r] : {};
		r % 2 ? ownKeys$51(Object(t), !0).forEach(function(r$1) {
			_defineProperty$51(e, r$1, t[r$1]);
		}) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys$51(Object(t)).forEach(function(r$1) {
			Object.defineProperty(e, r$1, Object.getOwnPropertyDescriptor(t, r$1));
		});
	}
	return e;
}
function _defineProperty$51(obj, key, value) {
	key = _toPropertyKey$51(key);
	if (key in obj) Object.defineProperty(obj, key, {
		value,
		enumerable: true,
		configurable: true,
		writable: true
	});
	else obj[key] = value;
	return obj;
}
function _toPropertyKey$51(t) {
	var i = _toPrimitive$51(t, "string");
	return "symbol" == _typeof$51(i) ? i : String(i);
}
function _toPrimitive$51(t, r) {
	if ("object" != _typeof$51(t) || !t) return t;
	var e = t[Symbol.toPrimitive];
	if (void 0 !== e) {
		var i = e.call(t, r || "default");
		if ("object" != _typeof$51(i)) return i;
		throw new TypeError("@@toPrimitive must return a primitive value.");
	}
	return ("string" === r ? String : Number)(t);
}
function _objectWithoutProperties$51(source, excluded) {
	if (source == null) return {};
	var target = _objectWithoutPropertiesLoose$51(source, excluded);
	var key, i;
	if (Object.getOwnPropertySymbols) {
		var sourceSymbolKeys = Object.getOwnPropertySymbols(source);
		for (i = 0; i < sourceSymbolKeys.length; i++) {
			key = sourceSymbolKeys[i];
			if (excluded.indexOf(key) >= 0) continue;
			if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue;
			target[key] = source[key];
		}
	}
	return target;
}
function _objectWithoutPropertiesLoose$51(source, excluded) {
	if (source == null) return {};
	var target = {};
	var sourceKeys = Object.keys(source);
	var key, i;
	for (i = 0; i < sourceKeys.length; i++) {
		key = sourceKeys[i];
		if (excluded.indexOf(key) >= 0) continue;
		target[key] = source[key];
	}
	return target;
}
var Icon$51 = /* @__PURE__ */ (0, react.memo)(function(_ref) {
	var _ref$size = _ref.size, size = _ref$size === void 0 ? "1em" : _ref$size, style = _ref.style, rest = _objectWithoutProperties$51(_ref, _excluded$51);
	var _useFillId = useFillId(TITLE$50), id = _useFillId.id, fill = _useFillId.fill;
	return /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("svg", _objectSpread$51(_objectSpread$51({
		height: size,
		style: _objectSpread$51({
			flex: "none",
			lineHeight: 1
		}, style),
		viewBox: "0 0 24 24",
		width: size,
		xmlns: "http://www.w3.org/2000/svg"
	}, rest), {}, { children: [
		/* @__PURE__ */ (0, react_jsx_runtime.jsx)("title", { children: TITLE$50 }),
		/* @__PURE__ */ (0, react_jsx_runtime.jsx)("path", {
			d: "M19.503 0H4.496A4.496 4.496 0 000 4.496v15.007A4.496 4.496 0 004.496 24h15.007A4.496 4.496 0 0024 19.503V4.496A4.496 4.496 0 0019.503 0z",
			fill: "#fff"
		}),
		/* @__PURE__ */ (0, react_jsx_runtime.jsx)("path", {
			d: "M9.064 3.344a4.578 4.578 0 012.285-.312c1 .115 1.891.54 2.673 1.275.01.01.024.017.037.021a.09.09 0 00.043 0 4.55 4.55 0 013.046.275l.047.022.116.057a4.581 4.581 0 012.188 2.399c.209.51.313 1.041.315 1.595a4.24 4.24 0 01-.134 1.223.123.123 0 00.03.115c.594.607.988 1.33 1.183 2.17.289 1.425-.007 2.71-.887 3.854l-.136.166a4.548 4.548 0 01-2.201 1.388.123.123 0 00-.081.076c-.191.551-.383 1.023-.74 1.494-.9 1.187-2.222 1.846-3.711 1.838-1.187-.006-2.239-.44-3.157-1.302a.107.107 0 00-.105-.024c-.388.125-.78.143-1.204.138a4.441 4.441 0 01-1.945-.466 4.544 4.544 0 01-1.61-1.335c-.152-.202-.303-.392-.414-.617a5.81 5.81 0 01-.37-.961 4.582 4.582 0 01-.014-2.298.124.124 0 00.006-.056.085.085 0 00-.027-.048 4.467 4.467 0 01-1.034-1.651 3.896 3.896 0 01-.251-1.192 5.189 5.189 0 01.141-1.6c.337-1.112.982-1.985 1.933-2.618.212-.141.413-.251.601-.33.215-.089.43-.164.646-.227a.098.098 0 00.065-.066 4.51 4.51 0 01.829-1.615 4.535 4.535 0 011.837-1.388zm3.482 10.565a.637.637 0 000 1.272h3.636a.637.637 0 100-1.272h-3.636zM8.462 9.23a.637.637 0 00-1.106.631l1.272 2.224-1.266 2.136a.636.636 0 101.095.649l1.454-2.455a.636.636 0 00.005-.64L8.462 9.23z",
			fill
		}),
		/* @__PURE__ */ (0, react_jsx_runtime.jsx)("defs", { children: /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("linearGradient", {
			gradientUnits: "userSpaceOnUse",
			id,
			x1: "12",
			x2: "12",
			y1: "3",
			y2: "21",
			children: [
				/* @__PURE__ */ (0, react_jsx_runtime.jsx)("stop", { stopColor: "#B1A7FF" }),
				/* @__PURE__ */ (0, react_jsx_runtime.jsx)("stop", {
					offset: ".5",
					stopColor: "#7A9DFF"
				}),
				/* @__PURE__ */ (0, react_jsx_runtime.jsx)("stop", {
					offset: "1",
					stopColor: "#3941FF"
				})
			]
		}) })
	] }));
});
var Color_default$10 = Icon$51;

//#endregion
//#region node_modules/.pnpm/@lobehub+icons@5.16.0_@types+react@18.3.31_react@18.3.1/node_modules/@lobehub/icons/es/Cohere/style.js
var TITLE$49 = "Cohere";

//#endregion
//#region node_modules/.pnpm/@lobehub+icons@5.16.0_@types+react@18.3.31_react@18.3.1/node_modules/@lobehub/icons/es/Cohere/components/Color.js
function _typeof$50(o) {
	"@babel/helpers - typeof";
	return _typeof$50 = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(o$1) {
		return typeof o$1;
	} : function(o$1) {
		return o$1 && "function" == typeof Symbol && o$1.constructor === Symbol && o$1 !== Symbol.prototype ? "symbol" : typeof o$1;
	}, _typeof$50(o);
}
var _excluded$50 = ["size", "style"];
function ownKeys$50(e, r) {
	var t = Object.keys(e);
	if (Object.getOwnPropertySymbols) {
		var o = Object.getOwnPropertySymbols(e);
		r && (o = o.filter(function(r$1) {
			return Object.getOwnPropertyDescriptor(e, r$1).enumerable;
		})), t.push.apply(t, o);
	}
	return t;
}
function _objectSpread$50(e) {
	for (var r = 1; r < arguments.length; r++) {
		var t = null != arguments[r] ? arguments[r] : {};
		r % 2 ? ownKeys$50(Object(t), !0).forEach(function(r$1) {
			_defineProperty$50(e, r$1, t[r$1]);
		}) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys$50(Object(t)).forEach(function(r$1) {
			Object.defineProperty(e, r$1, Object.getOwnPropertyDescriptor(t, r$1));
		});
	}
	return e;
}
function _defineProperty$50(obj, key, value) {
	key = _toPropertyKey$50(key);
	if (key in obj) Object.defineProperty(obj, key, {
		value,
		enumerable: true,
		configurable: true,
		writable: true
	});
	else obj[key] = value;
	return obj;
}
function _toPropertyKey$50(t) {
	var i = _toPrimitive$50(t, "string");
	return "symbol" == _typeof$50(i) ? i : String(i);
}
function _toPrimitive$50(t, r) {
	if ("object" != _typeof$50(t) || !t) return t;
	var e = t[Symbol.toPrimitive];
	if (void 0 !== e) {
		var i = e.call(t, r || "default");
		if ("object" != _typeof$50(i)) return i;
		throw new TypeError("@@toPrimitive must return a primitive value.");
	}
	return ("string" === r ? String : Number)(t);
}
function _objectWithoutProperties$50(source, excluded) {
	if (source == null) return {};
	var target = _objectWithoutPropertiesLoose$50(source, excluded);
	var key, i;
	if (Object.getOwnPropertySymbols) {
		var sourceSymbolKeys = Object.getOwnPropertySymbols(source);
		for (i = 0; i < sourceSymbolKeys.length; i++) {
			key = sourceSymbolKeys[i];
			if (excluded.indexOf(key) >= 0) continue;
			if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue;
			target[key] = source[key];
		}
	}
	return target;
}
function _objectWithoutPropertiesLoose$50(source, excluded) {
	if (source == null) return {};
	var target = {};
	var sourceKeys = Object.keys(source);
	var key, i;
	for (i = 0; i < sourceKeys.length; i++) {
		key = sourceKeys[i];
		if (excluded.indexOf(key) >= 0) continue;
		target[key] = source[key];
	}
	return target;
}
var Icon$50 = /* @__PURE__ */ (0, react.memo)(function(_ref) {
	var _ref$size = _ref.size, size = _ref$size === void 0 ? "1em" : _ref$size, style = _ref.style, rest = _objectWithoutProperties$50(_ref, _excluded$50);
	return /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("svg", _objectSpread$50(_objectSpread$50({
		height: size,
		style: _objectSpread$50({
			flex: "none",
			lineHeight: 1
		}, style),
		viewBox: "0 0 24 24",
		width: size,
		xmlns: "http://www.w3.org/2000/svg"
	}, rest), {}, { children: [
		/* @__PURE__ */ (0, react_jsx_runtime.jsx)("title", { children: TITLE$49 }),
		/* @__PURE__ */ (0, react_jsx_runtime.jsx)("path", {
			clipRule: "evenodd",
			d: "M8.128 14.099c.592 0 1.77-.033 3.398-.703 1.897-.781 5.672-2.2 8.395-3.656 1.905-1.018 2.74-2.366 2.74-4.18A4.56 4.56 0 0018.1 1H7.549A6.55 6.55 0 001 7.55c0 3.617 2.745 6.549 7.128 6.549z",
			fill: "#39594D",
			fillRule: "evenodd"
		}),
		/* @__PURE__ */ (0, react_jsx_runtime.jsx)("path", {
			clipRule: "evenodd",
			d: "M9.912 18.61a4.387 4.387 0 012.705-4.052l3.323-1.38c3.361-1.394 7.06 1.076 7.06 4.715a5.104 5.104 0 01-5.105 5.104l-3.597-.001a4.386 4.386 0 01-4.386-4.387z",
			fill: "#D18EE2",
			fillRule: "evenodd"
		}),
		/* @__PURE__ */ (0, react_jsx_runtime.jsx)("path", {
			d: "M4.776 14.962A3.775 3.775 0 001 18.738v.489a3.776 3.776 0 007.551 0v-.49a3.775 3.775 0 00-3.775-3.775z",
			fill: "#FF7759"
		})
	] }));
});
var Color_default$11 = Icon$50;

//#endregion
//#region node_modules/.pnpm/@lobehub+icons@5.16.0_@types+react@18.3.31_react@18.3.1/node_modules/@lobehub/icons/es/DeepInfra/style.js
var TITLE$48 = "DeepInfra";

//#endregion
//#region node_modules/.pnpm/@lobehub+icons@5.16.0_@types+react@18.3.31_react@18.3.1/node_modules/@lobehub/icons/es/DeepInfra/components/Color.js
function _typeof$49(o) {
	"@babel/helpers - typeof";
	return _typeof$49 = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(o$1) {
		return typeof o$1;
	} : function(o$1) {
		return o$1 && "function" == typeof Symbol && o$1.constructor === Symbol && o$1 !== Symbol.prototype ? "symbol" : typeof o$1;
	}, _typeof$49(o);
}
var _excluded$49 = ["size", "style"];
function ownKeys$49(e, r) {
	var t = Object.keys(e);
	if (Object.getOwnPropertySymbols) {
		var o = Object.getOwnPropertySymbols(e);
		r && (o = o.filter(function(r$1) {
			return Object.getOwnPropertyDescriptor(e, r$1).enumerable;
		})), t.push.apply(t, o);
	}
	return t;
}
function _objectSpread$49(e) {
	for (var r = 1; r < arguments.length; r++) {
		var t = null != arguments[r] ? arguments[r] : {};
		r % 2 ? ownKeys$49(Object(t), !0).forEach(function(r$1) {
			_defineProperty$49(e, r$1, t[r$1]);
		}) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys$49(Object(t)).forEach(function(r$1) {
			Object.defineProperty(e, r$1, Object.getOwnPropertyDescriptor(t, r$1));
		});
	}
	return e;
}
function _defineProperty$49(obj, key, value) {
	key = _toPropertyKey$49(key);
	if (key in obj) Object.defineProperty(obj, key, {
		value,
		enumerable: true,
		configurable: true,
		writable: true
	});
	else obj[key] = value;
	return obj;
}
function _toPropertyKey$49(t) {
	var i = _toPrimitive$49(t, "string");
	return "symbol" == _typeof$49(i) ? i : String(i);
}
function _toPrimitive$49(t, r) {
	if ("object" != _typeof$49(t) || !t) return t;
	var e = t[Symbol.toPrimitive];
	if (void 0 !== e) {
		var i = e.call(t, r || "default");
		if ("object" != _typeof$49(i)) return i;
		throw new TypeError("@@toPrimitive must return a primitive value.");
	}
	return ("string" === r ? String : Number)(t);
}
function _objectWithoutProperties$49(source, excluded) {
	if (source == null) return {};
	var target = _objectWithoutPropertiesLoose$49(source, excluded);
	var key, i;
	if (Object.getOwnPropertySymbols) {
		var sourceSymbolKeys = Object.getOwnPropertySymbols(source);
		for (i = 0; i < sourceSymbolKeys.length; i++) {
			key = sourceSymbolKeys[i];
			if (excluded.indexOf(key) >= 0) continue;
			if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue;
			target[key] = source[key];
		}
	}
	return target;
}
function _objectWithoutPropertiesLoose$49(source, excluded) {
	if (source == null) return {};
	var target = {};
	var sourceKeys = Object.keys(source);
	var key, i;
	for (i = 0; i < sourceKeys.length; i++) {
		key = sourceKeys[i];
		if (excluded.indexOf(key) >= 0) continue;
		target[key] = source[key];
	}
	return target;
}
var Icon$49 = /* @__PURE__ */ (0, react.memo)(function(_ref) {
	var _ref$size = _ref.size, size = _ref$size === void 0 ? "1em" : _ref$size, style = _ref.style, rest = _objectWithoutProperties$49(_ref, _excluded$49);
	return /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("svg", _objectSpread$49(_objectSpread$49({
		height: size,
		style: _objectSpread$49({
			flex: "none",
			lineHeight: 1
		}, style),
		viewBox: "0 0 24 24",
		width: size,
		xmlns: "http://www.w3.org/2000/svg"
	}, rest), {}, { children: [
		/* @__PURE__ */ (0, react_jsx_runtime.jsx)("title", { children: TITLE$48 }),
		/* @__PURE__ */ (0, react_jsx_runtime.jsx)("path", {
			d: "M3.294 7.821A2.297 2.297 0 011 5.527a2.297 2.297 0 012.294-2.295A2.297 2.297 0 015.59 5.527 2.297 2.297 0 013.294 7.82zm0-3.688a1.396 1.396 0 000 2.79 1.396 1.396 0 000-2.79zM3.294 14.293A2.297 2.297 0 011 11.998a2.297 2.297 0 012.294-2.294 2.297 2.297 0 012.295 2.294 2.297 2.297 0 01-2.295 2.295zm0-3.688a1.395 1.395 0 000 2.788 1.395 1.395 0 100-2.788zM3.294 20.761A2.297 2.297 0 011 18.467a2.297 2.297 0 012.294-2.295 2.297 2.297 0 012.295 2.295 2.297 2.297 0 01-2.295 2.294zm0-3.688a1.396 1.396 0 000 2.79 1.396 1.396 0 000-2.79zM20.738 7.821a2.297 2.297 0 01-2.295-2.294 2.297 2.297 0 012.294-2.295 2.297 2.297 0 012.295 2.295 2.297 2.297 0 01-2.294 2.294zm0-3.688a1.396 1.396 0 101.395 1.395c0-.77-.626-1.395-1.395-1.395zM20.738 14.293a2.297 2.297 0 01-2.295-2.295 2.297 2.297 0 012.294-2.294 2.297 2.297 0 012.295 2.294 2.297 2.297 0 01-2.294 2.295zm0-3.688c-.769 0-1.395.625-1.395 1.393a1.396 1.396 0 002.79 0c0-.77-.626-1.393-1.395-1.393zM20.738 20.761a2.297 2.297 0 01-2.295-2.294 2.297 2.297 0 012.294-2.295 2.297 2.297 0 012.295 2.295 2.297 2.297 0 01-2.294 2.294zm0-3.688a1.396 1.396 0 101.395 1.395c0-.77-.626-1.395-1.395-1.395zM12.016 11.057a2.297 2.297 0 01-2.294-2.294 2.297 2.297 0 012.294-2.295 2.297 2.297 0 012.295 2.295 2.297 2.297 0 01-2.295 2.294zm0-3.688a1.396 1.396 0 101.395 1.395c0-.77-.625-1.395-1.395-1.395zM12.017 4.589a2.297 2.297 0 01-2.295-2.295A2.297 2.297 0 0112.017 0a2.297 2.297 0 012.294 2.294 2.297 2.297 0 01-2.294 2.295zm0-3.688a1.396 1.396 0 101.395 1.395c0-.77-.626-1.395-1.395-1.395zM12.017 17.529a2.297 2.297 0 01-2.295-2.295 2.297 2.297 0 012.295-2.294 2.297 2.297 0 012.294 2.294 2.297 2.297 0 01-2.294 2.295zm0-3.688a1.396 1.396 0 101.395 1.395c0-.77-.626-1.395-1.395-1.395zM12.016 24a2.297 2.297 0 01-2.294-2.295 2.297 2.297 0 012.294-2.294 2.297 2.297 0 012.295 2.294A2.297 2.297 0 0112.016 24zm0-3.688a1.396 1.396 0 101.395 1.395c0-.77-.625-1.395-1.395-1.395z",
			fill: "#2A3275"
		}),
		/* @__PURE__ */ (0, react_jsx_runtime.jsx)("path", {
			d: "M8.363 8.222a.742.742 0 01-.277-.053l-1.494-.596a.75.75 0 11.557-1.392l1.493.595a.75.75 0 01-.278 1.446h-.001zM8.363 14.566a.743.743 0 01-.277-.053l-1.494-.595a.75.75 0 11.557-1.393l1.493.596a.75.75 0 01-.278 1.445h-.001zM17.124 11.397a.741.741 0 01-.277-.054l-1.493-.595a.75.75 0 11.555-1.392l1.493.595a.75.75 0 01-.278 1.446zM17.124 5.05a.744.744 0 01-.277-.054L15.354 4.4a.75.75 0 01.555-1.392l1.493.596a.75.75 0 01-.278 1.445zM17.124 17.739a.743.743 0 01-.277-.053l-1.494-.596a.75.75 0 11.556-1.392l1.493.596a.75.75 0 01-.278 1.445zM6.91 17.966a.75.75 0 01-.279-1.445l1.494-.595a.749.749 0 11.556 1.392l-1.493.595a.743.743 0 01-.277.053H6.91zM6.91 11.66a.75.75 0 01-.279-1.446l1.494-.595a.75.75 0 01.556 1.392l-1.493.595a.743.743 0 01-.277.053H6.91zM6.91 5.033a.75.75 0 01-.279-1.446l1.494-.595a.75.75 0 01.556 1.392l-1.493.596a.744.744 0 01-.277.053H6.91zM8.363 21.364a.743.743 0 01-.277-.053l-1.494-.596a.75.75 0 01.555-1.392l1.494.595a.75.75 0 01-.278 1.446zM15.63 8.223a.75.75 0 01-.278-1.447l1.494-.595a.75.75 0 01.556 1.393l-1.494.595a.744.744 0 01-.276.054h-.002zM15.63 14.567a.75.75 0 01-.278-1.446l1.494-.596a.75.75 0 01.556 1.394l-1.494.595a.743.743 0 01-.276.053h-.002zM15.63 21.363a.749.749 0 01-.278-1.445l1.494-.595a.75.75 0 11.555 1.392l-1.494.595a.741.741 0 01-.277.053z",
			fill: "#5699DB"
		})
	] }));
});
var Color_default$12 = Icon$49;

//#endregion
//#region node_modules/.pnpm/@lobehub+icons@5.16.0_@types+react@18.3.31_react@18.3.1/node_modules/@lobehub/icons/es/DeepSeek/style.js
var TITLE$47 = "DeepSeek";

//#endregion
//#region node_modules/.pnpm/@lobehub+icons@5.16.0_@types+react@18.3.31_react@18.3.1/node_modules/@lobehub/icons/es/DeepSeek/components/Color.js
function _typeof$48(o) {
	"@babel/helpers - typeof";
	return _typeof$48 = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(o$1) {
		return typeof o$1;
	} : function(o$1) {
		return o$1 && "function" == typeof Symbol && o$1.constructor === Symbol && o$1 !== Symbol.prototype ? "symbol" : typeof o$1;
	}, _typeof$48(o);
}
var _excluded$48 = ["size", "style"];
function ownKeys$48(e, r) {
	var t = Object.keys(e);
	if (Object.getOwnPropertySymbols) {
		var o = Object.getOwnPropertySymbols(e);
		r && (o = o.filter(function(r$1) {
			return Object.getOwnPropertyDescriptor(e, r$1).enumerable;
		})), t.push.apply(t, o);
	}
	return t;
}
function _objectSpread$48(e) {
	for (var r = 1; r < arguments.length; r++) {
		var t = null != arguments[r] ? arguments[r] : {};
		r % 2 ? ownKeys$48(Object(t), !0).forEach(function(r$1) {
			_defineProperty$48(e, r$1, t[r$1]);
		}) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys$48(Object(t)).forEach(function(r$1) {
			Object.defineProperty(e, r$1, Object.getOwnPropertyDescriptor(t, r$1));
		});
	}
	return e;
}
function _defineProperty$48(obj, key, value) {
	key = _toPropertyKey$48(key);
	if (key in obj) Object.defineProperty(obj, key, {
		value,
		enumerable: true,
		configurable: true,
		writable: true
	});
	else obj[key] = value;
	return obj;
}
function _toPropertyKey$48(t) {
	var i = _toPrimitive$48(t, "string");
	return "symbol" == _typeof$48(i) ? i : String(i);
}
function _toPrimitive$48(t, r) {
	if ("object" != _typeof$48(t) || !t) return t;
	var e = t[Symbol.toPrimitive];
	if (void 0 !== e) {
		var i = e.call(t, r || "default");
		if ("object" != _typeof$48(i)) return i;
		throw new TypeError("@@toPrimitive must return a primitive value.");
	}
	return ("string" === r ? String : Number)(t);
}
function _objectWithoutProperties$48(source, excluded) {
	if (source == null) return {};
	var target = _objectWithoutPropertiesLoose$48(source, excluded);
	var key, i;
	if (Object.getOwnPropertySymbols) {
		var sourceSymbolKeys = Object.getOwnPropertySymbols(source);
		for (i = 0; i < sourceSymbolKeys.length; i++) {
			key = sourceSymbolKeys[i];
			if (excluded.indexOf(key) >= 0) continue;
			if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue;
			target[key] = source[key];
		}
	}
	return target;
}
function _objectWithoutPropertiesLoose$48(source, excluded) {
	if (source == null) return {};
	var target = {};
	var sourceKeys = Object.keys(source);
	var key, i;
	for (i = 0; i < sourceKeys.length; i++) {
		key = sourceKeys[i];
		if (excluded.indexOf(key) >= 0) continue;
		target[key] = source[key];
	}
	return target;
}
var Icon$48 = /* @__PURE__ */ (0, react.memo)(function(_ref) {
	var _ref$size = _ref.size, size = _ref$size === void 0 ? "1em" : _ref$size, style = _ref.style, rest = _objectWithoutProperties$48(_ref, _excluded$48);
	return /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("svg", _objectSpread$48(_objectSpread$48({
		height: size,
		style: _objectSpread$48({
			flex: "none",
			lineHeight: 1
		}, style),
		viewBox: "0 0 24 24",
		width: size,
		xmlns: "http://www.w3.org/2000/svg"
	}, rest), {}, { children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)("title", { children: TITLE$47 }), /* @__PURE__ */ (0, react_jsx_runtime.jsx)("path", {
		d: "M23.748 4.482c-.254-.124-.364.113-.512.234-.051.039-.094.09-.137.136-.372.397-.806.657-1.373.626-.829-.046-1.537.214-2.163.848-.133-.782-.575-1.248-1.247-1.548-.352-.156-.708-.311-.955-.65-.172-.241-.219-.51-.305-.774-.055-.16-.11-.323-.293-.35-.2-.031-.278.136-.356.276-.313.572-.434 1.202-.422 1.84.027 1.436.633 2.58 1.838 3.393.137.093.172.187.129.323-.082.28-.18.552-.266.833-.055.179-.137.217-.329.14a5.526 5.526 0 01-1.736-1.18c-.857-.828-1.631-1.742-2.597-2.458a11.365 11.365 0 00-.689-.471c-.985-.957.13-1.743.388-1.836.27-.098.093-.432-.779-.428-.872.004-1.67.295-2.687.684a3.055 3.055 0 01-.465.137 9.597 9.597 0 00-2.883-.102c-1.885.21-3.39 1.102-4.497 2.623C.082 8.606-.231 10.684.152 12.85c.403 2.284 1.569 4.175 3.36 5.653 1.858 1.533 3.997 2.284 6.438 2.14 1.482-.085 3.133-.284 4.994-1.86.47.234.962.327 1.78.397.63.059 1.236-.03 1.705-.128.735-.156.684-.837.419-.961-2.155-1.004-1.682-.595-2.113-.926 1.096-1.296 2.746-2.642 3.392-7.003.05-.347.007-.565 0-.845-.004-.17.035-.237.23-.256a4.173 4.173 0 001.545-.475c1.396-.763 1.96-2.015 2.093-3.517.02-.23-.004-.467-.247-.588zM11.581 18c-2.089-1.642-3.102-2.183-3.52-2.16-.392.024-.321.471-.235.763.09.288.207.486.371.739.114.167.192.416-.113.603-.673.416-1.842-.14-1.897-.167-1.361-.802-2.5-1.86-3.301-3.307-.774-1.393-1.224-2.887-1.298-4.482-.02-.386.093-.522.477-.592a4.696 4.696 0 011.529-.039c2.132.312 3.946 1.265 5.468 2.774.868.86 1.525 1.887 2.202 2.891.72 1.066 1.494 2.082 2.48 2.914.348.292.625.514.891.677-.802.09-2.14.11-3.054-.614zm1-6.44a.306.306 0 01.415-.287.302.302 0 01.2.288.306.306 0 01-.31.307.303.303 0 01-.304-.308zm3.11 1.596c-.2.081-.399.151-.59.16a1.245 1.245 0 01-.798-.254c-.274-.23-.47-.358-.552-.758a1.73 1.73 0 01.016-.588c.07-.327-.008-.537-.239-.727-.187-.156-.426-.199-.688-.199a.559.559 0 01-.254-.078c-.11-.054-.2-.19-.114-.358.028-.054.16-.186.192-.21.356-.202.767-.136 1.146.016.352.144.618.408 1.001.782.391.451.462.576.685.914.176.265.336.537.445.848.067.195-.019.354-.25.452z",
		fill: "#4D6BFE"
	})] }));
});
var Color_default$13 = Icon$48;

//#endregion
//#region node_modules/.pnpm/@lobehub+icons@5.16.0_@types+react@18.3.31_react@18.3.1/node_modules/@lobehub/icons/es/Doubao/style.js
var TITLE$46 = "Doubao";

//#endregion
//#region node_modules/.pnpm/@lobehub+icons@5.16.0_@types+react@18.3.31_react@18.3.1/node_modules/@lobehub/icons/es/Doubao/components/Color.js
function _typeof$47(o) {
	"@babel/helpers - typeof";
	return _typeof$47 = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(o$1) {
		return typeof o$1;
	} : function(o$1) {
		return o$1 && "function" == typeof Symbol && o$1.constructor === Symbol && o$1 !== Symbol.prototype ? "symbol" : typeof o$1;
	}, _typeof$47(o);
}
var _excluded$47 = ["size", "style"];
function ownKeys$47(e, r) {
	var t = Object.keys(e);
	if (Object.getOwnPropertySymbols) {
		var o = Object.getOwnPropertySymbols(e);
		r && (o = o.filter(function(r$1) {
			return Object.getOwnPropertyDescriptor(e, r$1).enumerable;
		})), t.push.apply(t, o);
	}
	return t;
}
function _objectSpread$47(e) {
	for (var r = 1; r < arguments.length; r++) {
		var t = null != arguments[r] ? arguments[r] : {};
		r % 2 ? ownKeys$47(Object(t), !0).forEach(function(r$1) {
			_defineProperty$47(e, r$1, t[r$1]);
		}) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys$47(Object(t)).forEach(function(r$1) {
			Object.defineProperty(e, r$1, Object.getOwnPropertyDescriptor(t, r$1));
		});
	}
	return e;
}
function _defineProperty$47(obj, key, value) {
	key = _toPropertyKey$47(key);
	if (key in obj) Object.defineProperty(obj, key, {
		value,
		enumerable: true,
		configurable: true,
		writable: true
	});
	else obj[key] = value;
	return obj;
}
function _toPropertyKey$47(t) {
	var i = _toPrimitive$47(t, "string");
	return "symbol" == _typeof$47(i) ? i : String(i);
}
function _toPrimitive$47(t, r) {
	if ("object" != _typeof$47(t) || !t) return t;
	var e = t[Symbol.toPrimitive];
	if (void 0 !== e) {
		var i = e.call(t, r || "default");
		if ("object" != _typeof$47(i)) return i;
		throw new TypeError("@@toPrimitive must return a primitive value.");
	}
	return ("string" === r ? String : Number)(t);
}
function _objectWithoutProperties$47(source, excluded) {
	if (source == null) return {};
	var target = _objectWithoutPropertiesLoose$47(source, excluded);
	var key, i;
	if (Object.getOwnPropertySymbols) {
		var sourceSymbolKeys = Object.getOwnPropertySymbols(source);
		for (i = 0; i < sourceSymbolKeys.length; i++) {
			key = sourceSymbolKeys[i];
			if (excluded.indexOf(key) >= 0) continue;
			if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue;
			target[key] = source[key];
		}
	}
	return target;
}
function _objectWithoutPropertiesLoose$47(source, excluded) {
	if (source == null) return {};
	var target = {};
	var sourceKeys = Object.keys(source);
	var key, i;
	for (i = 0; i < sourceKeys.length; i++) {
		key = sourceKeys[i];
		if (excluded.indexOf(key) >= 0) continue;
		target[key] = source[key];
	}
	return target;
}
var Icon$47 = /* @__PURE__ */ (0, react.memo)(function(_ref) {
	var _ref$size = _ref.size, size = _ref$size === void 0 ? "1em" : _ref$size, style = _ref.style, rest = _objectWithoutProperties$47(_ref, _excluded$47);
	return /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("svg", _objectSpread$47(_objectSpread$47({
		height: size,
		style: _objectSpread$47({
			flex: "none",
			lineHeight: 1
		}, style),
		viewBox: "0 0 24 24",
		width: size,
		xmlns: "http://www.w3.org/2000/svg"
	}, rest), {}, { children: [
		/* @__PURE__ */ (0, react_jsx_runtime.jsx)("title", { children: TITLE$46 }),
		/* @__PURE__ */ (0, react_jsx_runtime.jsx)("path", {
			d: "M5.31 15.756c.172-3.75 1.883-5.999 2.549-6.739-3.26 2.058-5.425 5.658-6.358 8.308v1.12C1.501 21.513 4.226 24 7.59 24a6.59 6.59 0 002.2-.375c.353-.12.7-.248 1.039-.378.913-.899 1.65-1.91 2.243-2.992-4.877 2.431-7.974.072-7.763-4.5l.002.001z",
			fill: "#1E37FC"
		}),
		/* @__PURE__ */ (0, react_jsx_runtime.jsx)("path", {
			d: "M22.57 10.283c-1.212-.901-4.109-2.404-7.397-2.8.295 3.792.093 8.766-2.1 12.773a12.782 12.782 0 01-2.244 2.992c3.764-1.448 6.746-3.457 8.596-5.219 2.82-2.683 3.353-5.178 3.361-6.66a2.737 2.737 0 00-.216-1.084v-.002z",
			fill: "#37E1BE"
		}),
		/* @__PURE__ */ (0, react_jsx_runtime.jsx)("path", {
			d: "M14.303 1.867C12.955.7 11.248 0 9.39 0 7.532 0 5.883.677 4.545 1.807 2.791 3.29 1.627 5.557 1.5 8.125v9.201c.932-2.65 3.097-6.25 6.357-8.307.5-.318 1.025-.595 1.569-.829 1.883-.801 3.878-.932 5.746-.706-.222-2.83-.718-5.002-.87-5.617h.001z",
			fill: "#A569FF"
		}),
		/* @__PURE__ */ (0, react_jsx_runtime.jsx)("path", {
			d: "M17.305 4.961a199.47 199.47 0 01-1.08-1.094c-.202-.213-.398-.419-.586-.622l-1.333-1.378c.151.615.648 2.786.869 5.617 3.288.395 6.185 1.898 7.396 2.8-1.306-1.275-3.475-3.487-5.266-5.323z",
			fill: "#1E37FC"
		})
	] }));
});
var Color_default$14 = Icon$47;

//#endregion
//#region node_modules/.pnpm/@lobehub+icons@5.16.0_@types+react@18.3.31_react@18.3.1/node_modules/@lobehub/icons/es/Fireworks/style.js
var TITLE$45 = "Fireworks";

//#endregion
//#region node_modules/.pnpm/@lobehub+icons@5.16.0_@types+react@18.3.31_react@18.3.1/node_modules/@lobehub/icons/es/Fireworks/components/Color.js
function _typeof$46(o) {
	"@babel/helpers - typeof";
	return _typeof$46 = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(o$1) {
		return typeof o$1;
	} : function(o$1) {
		return o$1 && "function" == typeof Symbol && o$1.constructor === Symbol && o$1 !== Symbol.prototype ? "symbol" : typeof o$1;
	}, _typeof$46(o);
}
var _excluded$46 = ["size", "style"];
function ownKeys$46(e, r) {
	var t = Object.keys(e);
	if (Object.getOwnPropertySymbols) {
		var o = Object.getOwnPropertySymbols(e);
		r && (o = o.filter(function(r$1) {
			return Object.getOwnPropertyDescriptor(e, r$1).enumerable;
		})), t.push.apply(t, o);
	}
	return t;
}
function _objectSpread$46(e) {
	for (var r = 1; r < arguments.length; r++) {
		var t = null != arguments[r] ? arguments[r] : {};
		r % 2 ? ownKeys$46(Object(t), !0).forEach(function(r$1) {
			_defineProperty$46(e, r$1, t[r$1]);
		}) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys$46(Object(t)).forEach(function(r$1) {
			Object.defineProperty(e, r$1, Object.getOwnPropertyDescriptor(t, r$1));
		});
	}
	return e;
}
function _defineProperty$46(obj, key, value) {
	key = _toPropertyKey$46(key);
	if (key in obj) Object.defineProperty(obj, key, {
		value,
		enumerable: true,
		configurable: true,
		writable: true
	});
	else obj[key] = value;
	return obj;
}
function _toPropertyKey$46(t) {
	var i = _toPrimitive$46(t, "string");
	return "symbol" == _typeof$46(i) ? i : String(i);
}
function _toPrimitive$46(t, r) {
	if ("object" != _typeof$46(t) || !t) return t;
	var e = t[Symbol.toPrimitive];
	if (void 0 !== e) {
		var i = e.call(t, r || "default");
		if ("object" != _typeof$46(i)) return i;
		throw new TypeError("@@toPrimitive must return a primitive value.");
	}
	return ("string" === r ? String : Number)(t);
}
function _objectWithoutProperties$46(source, excluded) {
	if (source == null) return {};
	var target = _objectWithoutPropertiesLoose$46(source, excluded);
	var key, i;
	if (Object.getOwnPropertySymbols) {
		var sourceSymbolKeys = Object.getOwnPropertySymbols(source);
		for (i = 0; i < sourceSymbolKeys.length; i++) {
			key = sourceSymbolKeys[i];
			if (excluded.indexOf(key) >= 0) continue;
			if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue;
			target[key] = source[key];
		}
	}
	return target;
}
function _objectWithoutPropertiesLoose$46(source, excluded) {
	if (source == null) return {};
	var target = {};
	var sourceKeys = Object.keys(source);
	var key, i;
	for (i = 0; i < sourceKeys.length; i++) {
		key = sourceKeys[i];
		if (excluded.indexOf(key) >= 0) continue;
		target[key] = source[key];
	}
	return target;
}
var Icon$46 = /* @__PURE__ */ (0, react.memo)(function(_ref) {
	var _ref$size = _ref.size, size = _ref$size === void 0 ? "1em" : _ref$size, style = _ref.style, rest = _objectWithoutProperties$46(_ref, _excluded$46);
	return /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("svg", _objectSpread$46(_objectSpread$46({
		height: size,
		style: _objectSpread$46({
			flex: "none",
			lineHeight: 1
		}, style),
		viewBox: "0 0 24 24",
		width: size,
		xmlns: "http://www.w3.org/2000/svg"
	}, rest), {}, { children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)("title", { children: TITLE$45 }), /* @__PURE__ */ (0, react_jsx_runtime.jsx)("path", {
		clipRule: "evenodd",
		d: "M14.8 5l-2.801 6.795L9.195 5H7.397l3.072 7.428a1.64 1.64 0 003.038.002L16.598 5H14.8zm1.196 10.352l5.124-5.244-.699-1.669-5.596 5.739a1.664 1.664 0 00-.343 1.807 1.642 1.642 0 001.516 1.012L16 17l8-.02-.699-1.669-7.303.041h-.002zM2.88 10.104l.699-1.669 5.596 5.739c.468.479.603 1.189.343 1.807a1.643 1.643 0 01-1.516 1.012l-8-.018-.002.002.699-1.669 7.303.042-5.122-5.246z",
		fill: "#5019C5",
		fillRule: "evenodd"
	})] }));
});
var Color_default$15 = Icon$46;

//#endregion
//#region node_modules/.pnpm/@lobehub+icons@5.16.0_@types+react@18.3.31_react@18.3.1/node_modules/@lobehub/icons/es/Gemini/style.js
var TITLE$44 = "Gemini";

//#endregion
//#region node_modules/.pnpm/@lobehub+icons@5.16.0_@types+react@18.3.31_react@18.3.1/node_modules/@lobehub/icons/es/Gemini/components/Color.js
function _typeof$45(o) {
	"@babel/helpers - typeof";
	return _typeof$45 = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(o$1) {
		return typeof o$1;
	} : function(o$1) {
		return o$1 && "function" == typeof Symbol && o$1.constructor === Symbol && o$1 !== Symbol.prototype ? "symbol" : typeof o$1;
	}, _typeof$45(o);
}
var _excluded$45 = ["size", "style"];
function ownKeys$45(e, r) {
	var t = Object.keys(e);
	if (Object.getOwnPropertySymbols) {
		var o = Object.getOwnPropertySymbols(e);
		r && (o = o.filter(function(r$1) {
			return Object.getOwnPropertyDescriptor(e, r$1).enumerable;
		})), t.push.apply(t, o);
	}
	return t;
}
function _objectSpread$45(e) {
	for (var r = 1; r < arguments.length; r++) {
		var t = null != arguments[r] ? arguments[r] : {};
		r % 2 ? ownKeys$45(Object(t), !0).forEach(function(r$1) {
			_defineProperty$45(e, r$1, t[r$1]);
		}) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys$45(Object(t)).forEach(function(r$1) {
			Object.defineProperty(e, r$1, Object.getOwnPropertyDescriptor(t, r$1));
		});
	}
	return e;
}
function _defineProperty$45(obj, key, value) {
	key = _toPropertyKey$45(key);
	if (key in obj) Object.defineProperty(obj, key, {
		value,
		enumerable: true,
		configurable: true,
		writable: true
	});
	else obj[key] = value;
	return obj;
}
function _toPropertyKey$45(t) {
	var i = _toPrimitive$45(t, "string");
	return "symbol" == _typeof$45(i) ? i : String(i);
}
function _toPrimitive$45(t, r) {
	if ("object" != _typeof$45(t) || !t) return t;
	var e = t[Symbol.toPrimitive];
	if (void 0 !== e) {
		var i = e.call(t, r || "default");
		if ("object" != _typeof$45(i)) return i;
		throw new TypeError("@@toPrimitive must return a primitive value.");
	}
	return ("string" === r ? String : Number)(t);
}
function _slicedToArray$1(arr, i) {
	return _arrayWithHoles$1(arr) || _iterableToArrayLimit$1(arr, i) || _unsupportedIterableToArray$1(arr, i) || _nonIterableRest$1();
}
function _nonIterableRest$1() {
	throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}
function _unsupportedIterableToArray$1(o, minLen) {
	if (!o) return;
	if (typeof o === "string") return _arrayLikeToArray$1(o, minLen);
	var n = Object.prototype.toString.call(o).slice(8, -1);
	if (n === "Object" && o.constructor) n = o.constructor.name;
	if (n === "Map" || n === "Set") return Array.from(o);
	if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray$1(o, minLen);
}
function _arrayLikeToArray$1(arr, len) {
	if (len == null || len > arr.length) len = arr.length;
	for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i];
	return arr2;
}
function _iterableToArrayLimit$1(r, l) {
	var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"];
	if (null != t) {
		var e, n, i, u, a = [], f = !0, o = !1;
		try {
			if (i = (t = t.call(r)).next, 0 === l) {
				if (Object(t) !== t) return;
				f = !1;
			} else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0);
		} catch (r$1) {
			o = !0, n = r$1;
		} finally {
			try {
				if (!f && null != t.return && (u = t.return(), Object(u) !== u)) return;
			} finally {
				if (o) throw n;
			}
		}
		return a;
	}
}
function _arrayWithHoles$1(arr) {
	if (Array.isArray(arr)) return arr;
}
function _objectWithoutProperties$45(source, excluded) {
	if (source == null) return {};
	var target = _objectWithoutPropertiesLoose$45(source, excluded);
	var key, i;
	if (Object.getOwnPropertySymbols) {
		var sourceSymbolKeys = Object.getOwnPropertySymbols(source);
		for (i = 0; i < sourceSymbolKeys.length; i++) {
			key = sourceSymbolKeys[i];
			if (excluded.indexOf(key) >= 0) continue;
			if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue;
			target[key] = source[key];
		}
	}
	return target;
}
function _objectWithoutPropertiesLoose$45(source, excluded) {
	if (source == null) return {};
	var target = {};
	var sourceKeys = Object.keys(source);
	var key, i;
	for (i = 0; i < sourceKeys.length; i++) {
		key = sourceKeys[i];
		if (excluded.indexOf(key) >= 0) continue;
		target[key] = source[key];
	}
	return target;
}
var Icon$45 = /* @__PURE__ */ (0, react.memo)(function(_ref) {
	var _ref$size = _ref.size, size = _ref$size === void 0 ? "1em" : _ref$size, style = _ref.style, rest = _objectWithoutProperties$45(_ref, _excluded$45);
	var _useFillIds2 = _slicedToArray$1(useFillIds(TITLE$44, 3), 3), a = _useFillIds2[0], b = _useFillIds2[1], c = _useFillIds2[2];
	return /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("svg", _objectSpread$45(_objectSpread$45({
		height: size,
		style: _objectSpread$45({
			flex: "none",
			lineHeight: 1
		}, style),
		viewBox: "0 0 24 24",
		width: size,
		xmlns: "http://www.w3.org/2000/svg"
	}, rest), {}, { children: [
		/* @__PURE__ */ (0, react_jsx_runtime.jsx)("title", { children: TITLE$44 }),
		/* @__PURE__ */ (0, react_jsx_runtime.jsx)("path", {
			d: "M20.616 10.835a14.147 14.147 0 01-4.45-3.001 14.111 14.111 0 01-3.678-6.452.503.503 0 00-.975 0 14.134 14.134 0 01-3.679 6.452 14.155 14.155 0 01-4.45 3.001c-.65.28-1.318.505-2.002.678a.502.502 0 000 .975c.684.172 1.35.397 2.002.677a14.147 14.147 0 014.45 3.001 14.112 14.112 0 013.679 6.453.502.502 0 00.975 0c.172-.685.397-1.351.677-2.003a14.145 14.145 0 013.001-4.45 14.113 14.113 0 016.453-3.678.503.503 0 000-.975 13.245 13.245 0 01-2.003-.678z",
			fill: "#3186FF"
		}),
		/* @__PURE__ */ (0, react_jsx_runtime.jsx)("path", {
			d: "M20.616 10.835a14.147 14.147 0 01-4.45-3.001 14.111 14.111 0 01-3.678-6.452.503.503 0 00-.975 0 14.134 14.134 0 01-3.679 6.452 14.155 14.155 0 01-4.45 3.001c-.65.28-1.318.505-2.002.678a.502.502 0 000 .975c.684.172 1.35.397 2.002.677a14.147 14.147 0 014.45 3.001 14.112 14.112 0 013.679 6.453.502.502 0 00.975 0c.172-.685.397-1.351.677-2.003a14.145 14.145 0 013.001-4.45 14.113 14.113 0 016.453-3.678.503.503 0 000-.975 13.245 13.245 0 01-2.003-.678z",
			fill: a.fill
		}),
		/* @__PURE__ */ (0, react_jsx_runtime.jsx)("path", {
			d: "M20.616 10.835a14.147 14.147 0 01-4.45-3.001 14.111 14.111 0 01-3.678-6.452.503.503 0 00-.975 0 14.134 14.134 0 01-3.679 6.452 14.155 14.155 0 01-4.45 3.001c-.65.28-1.318.505-2.002.678a.502.502 0 000 .975c.684.172 1.35.397 2.002.677a14.147 14.147 0 014.45 3.001 14.112 14.112 0 013.679 6.453.502.502 0 00.975 0c.172-.685.397-1.351.677-2.003a14.145 14.145 0 013.001-4.45 14.113 14.113 0 016.453-3.678.503.503 0 000-.975 13.245 13.245 0 01-2.003-.678z",
			fill: b.fill
		}),
		/* @__PURE__ */ (0, react_jsx_runtime.jsx)("path", {
			d: "M20.616 10.835a14.147 14.147 0 01-4.45-3.001 14.111 14.111 0 01-3.678-6.452.503.503 0 00-.975 0 14.134 14.134 0 01-3.679 6.452 14.155 14.155 0 01-4.45 3.001c-.65.28-1.318.505-2.002.678a.502.502 0 000 .975c.684.172 1.35.397 2.002.677a14.147 14.147 0 014.45 3.001 14.112 14.112 0 013.679 6.453.502.502 0 00.975 0c.172-.685.397-1.351.677-2.003a14.145 14.145 0 013.001-4.45 14.113 14.113 0 016.453-3.678.503.503 0 000-.975 13.245 13.245 0 01-2.003-.678z",
			fill: c.fill
		}),
		/* @__PURE__ */ (0, react_jsx_runtime.jsxs)("defs", { children: [
			/* @__PURE__ */ (0, react_jsx_runtime.jsxs)("linearGradient", {
				gradientUnits: "userSpaceOnUse",
				id: a.id,
				x1: "7",
				x2: "11",
				y1: "15.5",
				y2: "12",
				children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)("stop", { stopColor: "#08B962" }), /* @__PURE__ */ (0, react_jsx_runtime.jsx)("stop", {
					offset: "1",
					stopColor: "#08B962",
					stopOpacity: "0"
				})]
			}),
			/* @__PURE__ */ (0, react_jsx_runtime.jsxs)("linearGradient", {
				gradientUnits: "userSpaceOnUse",
				id: b.id,
				x1: "8",
				x2: "11.5",
				y1: "5.5",
				y2: "11",
				children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)("stop", { stopColor: "#F94543" }), /* @__PURE__ */ (0, react_jsx_runtime.jsx)("stop", {
					offset: "1",
					stopColor: "#F94543",
					stopOpacity: "0"
				})]
			}),
			/* @__PURE__ */ (0, react_jsx_runtime.jsxs)("linearGradient", {
				gradientUnits: "userSpaceOnUse",
				id: c.id,
				x1: "3.5",
				x2: "17.5",
				y1: "13.5",
				y2: "12",
				children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)("stop", { stopColor: "#FABC12" }), /* @__PURE__ */ (0, react_jsx_runtime.jsx)("stop", {
					offset: ".46",
					stopColor: "#FABC12",
					stopOpacity: "0"
				})]
			})
		] })
	] }));
});
var Color_default$16 = Icon$45;

//#endregion
//#region node_modules/.pnpm/@lobehub+icons@5.16.0_@types+react@18.3.31_react@18.3.1/node_modules/@lobehub/icons/es/GithubCopilot/style.js
var TITLE$43 = "GithubCopilot";

//#endregion
//#region node_modules/.pnpm/@lobehub+icons@5.16.0_@types+react@18.3.31_react@18.3.1/node_modules/@lobehub/icons/es/GithubCopilot/components/Mono.js
function _typeof$44(o) {
	"@babel/helpers - typeof";
	return _typeof$44 = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(o$1) {
		return typeof o$1;
	} : function(o$1) {
		return o$1 && "function" == typeof Symbol && o$1.constructor === Symbol && o$1 !== Symbol.prototype ? "symbol" : typeof o$1;
	}, _typeof$44(o);
}
var _excluded$44 = ["size", "style"];
function ownKeys$44(e, r) {
	var t = Object.keys(e);
	if (Object.getOwnPropertySymbols) {
		var o = Object.getOwnPropertySymbols(e);
		r && (o = o.filter(function(r$1) {
			return Object.getOwnPropertyDescriptor(e, r$1).enumerable;
		})), t.push.apply(t, o);
	}
	return t;
}
function _objectSpread$44(e) {
	for (var r = 1; r < arguments.length; r++) {
		var t = null != arguments[r] ? arguments[r] : {};
		r % 2 ? ownKeys$44(Object(t), !0).forEach(function(r$1) {
			_defineProperty$44(e, r$1, t[r$1]);
		}) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys$44(Object(t)).forEach(function(r$1) {
			Object.defineProperty(e, r$1, Object.getOwnPropertyDescriptor(t, r$1));
		});
	}
	return e;
}
function _defineProperty$44(obj, key, value) {
	key = _toPropertyKey$44(key);
	if (key in obj) Object.defineProperty(obj, key, {
		value,
		enumerable: true,
		configurable: true,
		writable: true
	});
	else obj[key] = value;
	return obj;
}
function _toPropertyKey$44(t) {
	var i = _toPrimitive$44(t, "string");
	return "symbol" == _typeof$44(i) ? i : String(i);
}
function _toPrimitive$44(t, r) {
	if ("object" != _typeof$44(t) || !t) return t;
	var e = t[Symbol.toPrimitive];
	if (void 0 !== e) {
		var i = e.call(t, r || "default");
		if ("object" != _typeof$44(i)) return i;
		throw new TypeError("@@toPrimitive must return a primitive value.");
	}
	return ("string" === r ? String : Number)(t);
}
function _objectWithoutProperties$44(source, excluded) {
	if (source == null) return {};
	var target = _objectWithoutPropertiesLoose$44(source, excluded);
	var key, i;
	if (Object.getOwnPropertySymbols) {
		var sourceSymbolKeys = Object.getOwnPropertySymbols(source);
		for (i = 0; i < sourceSymbolKeys.length; i++) {
			key = sourceSymbolKeys[i];
			if (excluded.indexOf(key) >= 0) continue;
			if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue;
			target[key] = source[key];
		}
	}
	return target;
}
function _objectWithoutPropertiesLoose$44(source, excluded) {
	if (source == null) return {};
	var target = {};
	var sourceKeys = Object.keys(source);
	var key, i;
	for (i = 0; i < sourceKeys.length; i++) {
		key = sourceKeys[i];
		if (excluded.indexOf(key) >= 0) continue;
		target[key] = source[key];
	}
	return target;
}
var Icon$44 = /* @__PURE__ */ (0, react.memo)(function(_ref) {
	var _ref$size = _ref.size, size = _ref$size === void 0 ? "1em" : _ref$size, style = _ref.style, rest = _objectWithoutProperties$44(_ref, _excluded$44);
	return /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("svg", _objectSpread$44(_objectSpread$44({
		fill: "currentColor",
		fillRule: "evenodd",
		height: size,
		style: _objectSpread$44({
			flex: "none",
			lineHeight: 1
		}, style),
		viewBox: "0 0 24 24",
		width: size,
		xmlns: "http://www.w3.org/2000/svg"
	}, rest), {}, { children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)("title", { children: TITLE$43 }), /* @__PURE__ */ (0, react_jsx_runtime.jsx)("path", { d: "M19.245 5.364c1.322 1.36 1.877 3.216 2.11 5.817.622 0 1.2.135 1.592.654l.73.964c.21.278.323.61.323.955v2.62c0 .339-.173.669-.453.868C20.239 19.602 16.157 21.5 12 21.5c-4.6 0-9.205-2.583-11.547-4.258-.28-.2-.452-.53-.453-.868v-2.62c0-.345.113-.679.321-.956l.73-.963c.392-.517.974-.654 1.593-.654l.029-.297c.25-2.446.81-4.213 2.082-5.52 2.461-2.54 5.71-2.851 7.146-2.864h.198c1.436.013 4.685.323 7.146 2.864zm-7.244 4.328c-.284 0-.613.016-.962.05-.123.447-.305.85-.57 1.108-1.05 1.023-2.316 1.18-2.994 1.18-.638 0-1.306-.13-1.851-.464-.516.165-1.012.403-1.044.996a65.882 65.882 0 00-.063 2.884l-.002.48c-.002.563-.005 1.126-.013 1.69.002.326.204.63.51.765 2.482 1.102 4.83 1.657 6.99 1.657 2.156 0 4.504-.555 6.985-1.657a.854.854 0 00.51-.766c.03-1.682.006-3.372-.076-5.053-.031-.596-.528-.83-1.046-.996-.546.333-1.212.464-1.85.464-.677 0-1.942-.157-2.993-1.18-.266-.258-.447-.661-.57-1.108-.32-.032-.64-.049-.96-.05zm-2.525 4.013c.539 0 .976.426.976.95v1.753c0 .525-.437.95-.976.95a.964.964 0 01-.976-.95v-1.752c0-.525.437-.951.976-.951zm5 0c.539 0 .976.426.976.95v1.753c0 .525-.437.95-.976.95a.964.964 0 01-.976-.95v-1.752c0-.525.437-.951.976-.951zM7.635 5.087c-1.05.102-1.935.438-2.385.906-.975 1.037-.765 3.668-.21 4.224.405.394 1.17.657 1.995.657h.09c.649-.013 1.785-.176 2.73-1.11.435-.41.705-1.433.675-2.47-.03-.834-.27-1.52-.63-1.813-.39-.336-1.275-.482-2.265-.394zm6.465.394c-.36.292-.6.98-.63 1.813-.03 1.037.24 2.06.675 2.47.968.957 2.136 1.104 2.776 1.11h.044c.825 0 1.59-.263 1.995-.657.555-.556.765-3.187-.21-4.224-.45-.468-1.335-.804-2.385-.906-.99-.088-1.875.058-2.265.394zM12 7.615c-.24 0-.525.015-.84.044.03.16.045.336.06.526l-.001.159a2.94 2.94 0 01-.014.25c.225-.022.425-.027.612-.028h.366c.187 0 .387.006.612.028-.015-.146-.015-.277-.015-.409.015-.19.03-.365.06-.526a9.29 9.29 0 00-.84-.044z" })] }));
});
var Mono_default$1 = Icon$44;

//#endregion
//#region node_modules/.pnpm/@lobehub+icons@5.16.0_@types+react@18.3.31_react@18.3.1/node_modules/@lobehub/icons/es/Google/style.js
var TITLE$42 = "Google";

//#endregion
//#region node_modules/.pnpm/@lobehub+icons@5.16.0_@types+react@18.3.31_react@18.3.1/node_modules/@lobehub/icons/es/Google/components/Color.js
function _typeof$43(o) {
	"@babel/helpers - typeof";
	return _typeof$43 = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(o$1) {
		return typeof o$1;
	} : function(o$1) {
		return o$1 && "function" == typeof Symbol && o$1.constructor === Symbol && o$1 !== Symbol.prototype ? "symbol" : typeof o$1;
	}, _typeof$43(o);
}
var _excluded$43 = ["size", "style"];
function ownKeys$43(e, r) {
	var t = Object.keys(e);
	if (Object.getOwnPropertySymbols) {
		var o = Object.getOwnPropertySymbols(e);
		r && (o = o.filter(function(r$1) {
			return Object.getOwnPropertyDescriptor(e, r$1).enumerable;
		})), t.push.apply(t, o);
	}
	return t;
}
function _objectSpread$43(e) {
	for (var r = 1; r < arguments.length; r++) {
		var t = null != arguments[r] ? arguments[r] : {};
		r % 2 ? ownKeys$43(Object(t), !0).forEach(function(r$1) {
			_defineProperty$43(e, r$1, t[r$1]);
		}) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys$43(Object(t)).forEach(function(r$1) {
			Object.defineProperty(e, r$1, Object.getOwnPropertyDescriptor(t, r$1));
		});
	}
	return e;
}
function _defineProperty$43(obj, key, value) {
	key = _toPropertyKey$43(key);
	if (key in obj) Object.defineProperty(obj, key, {
		value,
		enumerable: true,
		configurable: true,
		writable: true
	});
	else obj[key] = value;
	return obj;
}
function _toPropertyKey$43(t) {
	var i = _toPrimitive$43(t, "string");
	return "symbol" == _typeof$43(i) ? i : String(i);
}
function _toPrimitive$43(t, r) {
	if ("object" != _typeof$43(t) || !t) return t;
	var e = t[Symbol.toPrimitive];
	if (void 0 !== e) {
		var i = e.call(t, r || "default");
		if ("object" != _typeof$43(i)) return i;
		throw new TypeError("@@toPrimitive must return a primitive value.");
	}
	return ("string" === r ? String : Number)(t);
}
function _objectWithoutProperties$43(source, excluded) {
	if (source == null) return {};
	var target = _objectWithoutPropertiesLoose$43(source, excluded);
	var key, i;
	if (Object.getOwnPropertySymbols) {
		var sourceSymbolKeys = Object.getOwnPropertySymbols(source);
		for (i = 0; i < sourceSymbolKeys.length; i++) {
			key = sourceSymbolKeys[i];
			if (excluded.indexOf(key) >= 0) continue;
			if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue;
			target[key] = source[key];
		}
	}
	return target;
}
function _objectWithoutPropertiesLoose$43(source, excluded) {
	if (source == null) return {};
	var target = {};
	var sourceKeys = Object.keys(source);
	var key, i;
	for (i = 0; i < sourceKeys.length; i++) {
		key = sourceKeys[i];
		if (excluded.indexOf(key) >= 0) continue;
		target[key] = source[key];
	}
	return target;
}
var Icon$43 = /* @__PURE__ */ (0, react.memo)(function(_ref) {
	var _ref$size = _ref.size, size = _ref$size === void 0 ? "1em" : _ref$size, style = _ref.style, rest = _objectWithoutProperties$43(_ref, _excluded$43);
	return /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("svg", _objectSpread$43(_objectSpread$43({
		height: size,
		style: _objectSpread$43({
			flex: "none",
			lineHeight: 1
		}, style),
		viewBox: "0 0 24 24",
		width: size,
		xmlns: "http://www.w3.org/2000/svg"
	}, rest), {}, { children: [
		/* @__PURE__ */ (0, react_jsx_runtime.jsx)("title", { children: TITLE$42 }),
		/* @__PURE__ */ (0, react_jsx_runtime.jsx)("path", {
			d: "M23 12.245c0-.905-.075-1.565-.236-2.25h-10.54v4.083h6.186c-.124 1.014-.797 2.542-2.294 3.569l-.021.136 3.332 2.53.23.022C21.779 18.417 23 15.593 23 12.245z",
			fill: "#4285F4"
		}),
		/* @__PURE__ */ (0, react_jsx_runtime.jsx)("path", {
			d: "M12.225 23c3.03 0 5.574-.978 7.433-2.665l-3.542-2.688c-.948.648-2.22 1.1-3.891 1.1a6.745 6.745 0 01-6.386-4.572l-.132.011-3.465 2.628-.045.124C4.043 20.531 7.835 23 12.225 23z",
			fill: "#34A853"
		}),
		/* @__PURE__ */ (0, react_jsx_runtime.jsx)("path", {
			d: "M5.84 14.175A6.65 6.65 0 015.463 12c0-.758.138-1.491.361-2.175l-.006-.147-3.508-2.67-.115.054A10.831 10.831 0 001 12c0 1.772.436 3.447 1.197 4.938l3.642-2.763z",
			fill: "#FBBC05"
		}),
		/* @__PURE__ */ (0, react_jsx_runtime.jsx)("path", {
			d: "M12.225 5.253c2.108 0 3.529.892 4.34 1.638l3.167-3.031C17.787 2.088 15.255 1 12.225 1 7.834 1 4.043 3.469 2.197 7.062l3.63 2.763a6.77 6.77 0 016.398-4.572z",
			fill: "#EB4335"
		})
	] }));
});
var Color_default$17 = Icon$43;

//#endregion
//#region node_modules/.pnpm/@lobehub+icons@5.16.0_@types+react@18.3.31_react@18.3.1/node_modules/@lobehub/icons/es/Grok/style.js
var TITLE$41 = "Grok";

//#endregion
//#region node_modules/.pnpm/@lobehub+icons@5.16.0_@types+react@18.3.31_react@18.3.1/node_modules/@lobehub/icons/es/Grok/components/Mono.js
function _typeof$42(o) {
	"@babel/helpers - typeof";
	return _typeof$42 = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(o$1) {
		return typeof o$1;
	} : function(o$1) {
		return o$1 && "function" == typeof Symbol && o$1.constructor === Symbol && o$1 !== Symbol.prototype ? "symbol" : typeof o$1;
	}, _typeof$42(o);
}
var _excluded$42 = ["size", "style"];
function ownKeys$42(e, r) {
	var t = Object.keys(e);
	if (Object.getOwnPropertySymbols) {
		var o = Object.getOwnPropertySymbols(e);
		r && (o = o.filter(function(r$1) {
			return Object.getOwnPropertyDescriptor(e, r$1).enumerable;
		})), t.push.apply(t, o);
	}
	return t;
}
function _objectSpread$42(e) {
	for (var r = 1; r < arguments.length; r++) {
		var t = null != arguments[r] ? arguments[r] : {};
		r % 2 ? ownKeys$42(Object(t), !0).forEach(function(r$1) {
			_defineProperty$42(e, r$1, t[r$1]);
		}) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys$42(Object(t)).forEach(function(r$1) {
			Object.defineProperty(e, r$1, Object.getOwnPropertyDescriptor(t, r$1));
		});
	}
	return e;
}
function _defineProperty$42(obj, key, value) {
	key = _toPropertyKey$42(key);
	if (key in obj) Object.defineProperty(obj, key, {
		value,
		enumerable: true,
		configurable: true,
		writable: true
	});
	else obj[key] = value;
	return obj;
}
function _toPropertyKey$42(t) {
	var i = _toPrimitive$42(t, "string");
	return "symbol" == _typeof$42(i) ? i : String(i);
}
function _toPrimitive$42(t, r) {
	if ("object" != _typeof$42(t) || !t) return t;
	var e = t[Symbol.toPrimitive];
	if (void 0 !== e) {
		var i = e.call(t, r || "default");
		if ("object" != _typeof$42(i)) return i;
		throw new TypeError("@@toPrimitive must return a primitive value.");
	}
	return ("string" === r ? String : Number)(t);
}
function _objectWithoutProperties$42(source, excluded) {
	if (source == null) return {};
	var target = _objectWithoutPropertiesLoose$42(source, excluded);
	var key, i;
	if (Object.getOwnPropertySymbols) {
		var sourceSymbolKeys = Object.getOwnPropertySymbols(source);
		for (i = 0; i < sourceSymbolKeys.length; i++) {
			key = sourceSymbolKeys[i];
			if (excluded.indexOf(key) >= 0) continue;
			if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue;
			target[key] = source[key];
		}
	}
	return target;
}
function _objectWithoutPropertiesLoose$42(source, excluded) {
	if (source == null) return {};
	var target = {};
	var sourceKeys = Object.keys(source);
	var key, i;
	for (i = 0; i < sourceKeys.length; i++) {
		key = sourceKeys[i];
		if (excluded.indexOf(key) >= 0) continue;
		target[key] = source[key];
	}
	return target;
}
var Icon$42 = /* @__PURE__ */ (0, react.memo)(function(_ref) {
	var _ref$size = _ref.size, size = _ref$size === void 0 ? "1em" : _ref$size, style = _ref.style, rest = _objectWithoutProperties$42(_ref, _excluded$42);
	return /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("svg", _objectSpread$42(_objectSpread$42({
		fill: "currentColor",
		fillRule: "evenodd",
		height: size,
		style: _objectSpread$42({
			flex: "none",
			lineHeight: 1
		}, style),
		viewBox: "0 0 24 24",
		width: size,
		xmlns: "http://www.w3.org/2000/svg"
	}, rest), {}, { children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)("title", { children: TITLE$41 }), /* @__PURE__ */ (0, react_jsx_runtime.jsx)("path", { d: "M9.27 15.29l7.978-5.897c.391-.29.95-.177 1.137.272.98 2.369.542 5.215-1.41 7.169-1.951 1.954-4.667 2.382-7.149 1.406l-2.711 1.257c3.889 2.661 8.611 2.003 11.562-.953 2.341-2.344 3.066-5.539 2.388-8.42l.006.007c-.983-4.232.242-5.924 2.75-9.383.06-.082.12-.164.179-.248l-3.301 3.305v-.01L9.267 15.292M7.623 16.723c-2.792-2.67-2.31-6.801.071-9.184 1.761-1.763 4.647-2.483 7.166-1.425l2.705-1.25a7.808 7.808 0 00-1.829-1A8.975 8.975 0 005.984 5.83c-2.533 2.536-3.33 6.436-1.962 9.764 1.022 2.487-.653 4.246-2.34 6.022-.599.63-1.199 1.259-1.682 1.925l7.62-6.815" })] }));
});
var Mono_default$2 = Icon$42;

//#endregion
//#region node_modules/.pnpm/@lobehub+icons@5.16.0_@types+react@18.3.31_react@18.3.1/node_modules/@lobehub/icons/es/Groq/style.js
var TITLE$40 = "Groq";

//#endregion
//#region node_modules/.pnpm/@lobehub+icons@5.16.0_@types+react@18.3.31_react@18.3.1/node_modules/@lobehub/icons/es/Groq/components/Mono.js
function _typeof$41(o) {
	"@babel/helpers - typeof";
	return _typeof$41 = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(o$1) {
		return typeof o$1;
	} : function(o$1) {
		return o$1 && "function" == typeof Symbol && o$1.constructor === Symbol && o$1 !== Symbol.prototype ? "symbol" : typeof o$1;
	}, _typeof$41(o);
}
var _excluded$41 = ["size", "style"];
function ownKeys$41(e, r) {
	var t = Object.keys(e);
	if (Object.getOwnPropertySymbols) {
		var o = Object.getOwnPropertySymbols(e);
		r && (o = o.filter(function(r$1) {
			return Object.getOwnPropertyDescriptor(e, r$1).enumerable;
		})), t.push.apply(t, o);
	}
	return t;
}
function _objectSpread$41(e) {
	for (var r = 1; r < arguments.length; r++) {
		var t = null != arguments[r] ? arguments[r] : {};
		r % 2 ? ownKeys$41(Object(t), !0).forEach(function(r$1) {
			_defineProperty$41(e, r$1, t[r$1]);
		}) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys$41(Object(t)).forEach(function(r$1) {
			Object.defineProperty(e, r$1, Object.getOwnPropertyDescriptor(t, r$1));
		});
	}
	return e;
}
function _defineProperty$41(obj, key, value) {
	key = _toPropertyKey$41(key);
	if (key in obj) Object.defineProperty(obj, key, {
		value,
		enumerable: true,
		configurable: true,
		writable: true
	});
	else obj[key] = value;
	return obj;
}
function _toPropertyKey$41(t) {
	var i = _toPrimitive$41(t, "string");
	return "symbol" == _typeof$41(i) ? i : String(i);
}
function _toPrimitive$41(t, r) {
	if ("object" != _typeof$41(t) || !t) return t;
	var e = t[Symbol.toPrimitive];
	if (void 0 !== e) {
		var i = e.call(t, r || "default");
		if ("object" != _typeof$41(i)) return i;
		throw new TypeError("@@toPrimitive must return a primitive value.");
	}
	return ("string" === r ? String : Number)(t);
}
function _objectWithoutProperties$41(source, excluded) {
	if (source == null) return {};
	var target = _objectWithoutPropertiesLoose$41(source, excluded);
	var key, i;
	if (Object.getOwnPropertySymbols) {
		var sourceSymbolKeys = Object.getOwnPropertySymbols(source);
		for (i = 0; i < sourceSymbolKeys.length; i++) {
			key = sourceSymbolKeys[i];
			if (excluded.indexOf(key) >= 0) continue;
			if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue;
			target[key] = source[key];
		}
	}
	return target;
}
function _objectWithoutPropertiesLoose$41(source, excluded) {
	if (source == null) return {};
	var target = {};
	var sourceKeys = Object.keys(source);
	var key, i;
	for (i = 0; i < sourceKeys.length; i++) {
		key = sourceKeys[i];
		if (excluded.indexOf(key) >= 0) continue;
		target[key] = source[key];
	}
	return target;
}
var Icon$41 = /* @__PURE__ */ (0, react.memo)(function(_ref) {
	var _ref$size = _ref.size, size = _ref$size === void 0 ? "1em" : _ref$size, style = _ref.style, rest = _objectWithoutProperties$41(_ref, _excluded$41);
	return /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("svg", _objectSpread$41(_objectSpread$41({
		fill: "currentColor",
		fillRule: "evenodd",
		height: size,
		style: _objectSpread$41({
			flex: "none",
			lineHeight: 1
		}, style),
		viewBox: "0 0 24 24",
		width: size,
		xmlns: "http://www.w3.org/2000/svg"
	}, rest), {}, { children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)("title", { children: TITLE$40 }), /* @__PURE__ */ (0, react_jsx_runtime.jsx)("path", { d: "M12.036 2c-3.853-.035-7 3-7.036 6.781-.035 3.782 3.055 6.872 6.908 6.907h2.42v-2.566h-2.292c-2.407.028-4.38-1.866-4.408-4.23-.029-2.362 1.901-4.298 4.308-4.326h.1c2.407 0 4.358 1.915 4.365 4.278v6.305c0 2.342-1.944 4.25-4.323 4.279a4.375 4.375 0 01-3.033-1.252l-1.851 1.818A7 7 0 0012.029 22h.092c3.803-.056 6.858-3.083 6.879-6.816v-6.5C18.907 4.963 15.817 2 12.036 2z" })] }));
});
var Mono_default$3 = Icon$41;

//#endregion
//#region node_modules/.pnpm/@lobehub+icons@5.16.0_@types+react@18.3.31_react@18.3.1/node_modules/@lobehub/icons/es/HuggingFace/style.js
var TITLE$39 = "HuggingFace";

//#endregion
//#region node_modules/.pnpm/@lobehub+icons@5.16.0_@types+react@18.3.31_react@18.3.1/node_modules/@lobehub/icons/es/HuggingFace/components/Color.js
function _typeof$40(o) {
	"@babel/helpers - typeof";
	return _typeof$40 = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(o$1) {
		return typeof o$1;
	} : function(o$1) {
		return o$1 && "function" == typeof Symbol && o$1.constructor === Symbol && o$1 !== Symbol.prototype ? "symbol" : typeof o$1;
	}, _typeof$40(o);
}
var _excluded$40 = ["size", "style"];
function ownKeys$40(e, r) {
	var t = Object.keys(e);
	if (Object.getOwnPropertySymbols) {
		var o = Object.getOwnPropertySymbols(e);
		r && (o = o.filter(function(r$1) {
			return Object.getOwnPropertyDescriptor(e, r$1).enumerable;
		})), t.push.apply(t, o);
	}
	return t;
}
function _objectSpread$40(e) {
	for (var r = 1; r < arguments.length; r++) {
		var t = null != arguments[r] ? arguments[r] : {};
		r % 2 ? ownKeys$40(Object(t), !0).forEach(function(r$1) {
			_defineProperty$40(e, r$1, t[r$1]);
		}) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys$40(Object(t)).forEach(function(r$1) {
			Object.defineProperty(e, r$1, Object.getOwnPropertyDescriptor(t, r$1));
		});
	}
	return e;
}
function _defineProperty$40(obj, key, value) {
	key = _toPropertyKey$40(key);
	if (key in obj) Object.defineProperty(obj, key, {
		value,
		enumerable: true,
		configurable: true,
		writable: true
	});
	else obj[key] = value;
	return obj;
}
function _toPropertyKey$40(t) {
	var i = _toPrimitive$40(t, "string");
	return "symbol" == _typeof$40(i) ? i : String(i);
}
function _toPrimitive$40(t, r) {
	if ("object" != _typeof$40(t) || !t) return t;
	var e = t[Symbol.toPrimitive];
	if (void 0 !== e) {
		var i = e.call(t, r || "default");
		if ("object" != _typeof$40(i)) return i;
		throw new TypeError("@@toPrimitive must return a primitive value.");
	}
	return ("string" === r ? String : Number)(t);
}
function _objectWithoutProperties$40(source, excluded) {
	if (source == null) return {};
	var target = _objectWithoutPropertiesLoose$40(source, excluded);
	var key, i;
	if (Object.getOwnPropertySymbols) {
		var sourceSymbolKeys = Object.getOwnPropertySymbols(source);
		for (i = 0; i < sourceSymbolKeys.length; i++) {
			key = sourceSymbolKeys[i];
			if (excluded.indexOf(key) >= 0) continue;
			if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue;
			target[key] = source[key];
		}
	}
	return target;
}
function _objectWithoutPropertiesLoose$40(source, excluded) {
	if (source == null) return {};
	var target = {};
	var sourceKeys = Object.keys(source);
	var key, i;
	for (i = 0; i < sourceKeys.length; i++) {
		key = sourceKeys[i];
		if (excluded.indexOf(key) >= 0) continue;
		target[key] = source[key];
	}
	return target;
}
var Icon$40 = /* @__PURE__ */ (0, react.memo)(function(_ref) {
	var _ref$size = _ref.size, size = _ref$size === void 0 ? "1em" : _ref$size, style = _ref.style, rest = _objectWithoutProperties$40(_ref, _excluded$40);
	return /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("svg", _objectSpread$40(_objectSpread$40({
		height: size,
		style: _objectSpread$40({
			flex: "none",
			lineHeight: 1
		}, style),
		viewBox: "0 0 24 24",
		width: size,
		xmlns: "http://www.w3.org/2000/svg"
	}, rest), {}, { children: [
		/* @__PURE__ */ (0, react_jsx_runtime.jsx)("title", { children: TITLE$39 }),
		/* @__PURE__ */ (0, react_jsx_runtime.jsx)("path", {
			d: "M2.25 11.535c0-3.407 1.847-6.554 4.844-8.258a9.822 9.822 0 019.687 0c2.997 1.704 4.844 4.851 4.844 8.258 0 5.266-4.337 9.535-9.687 9.535S2.25 16.8 2.25 11.535z",
			fill: "#FF9D0B"
		}),
		/* @__PURE__ */ (0, react_jsx_runtime.jsx)("path", {
			d: "M11.938 20.086c4.797 0 8.687-3.829 8.687-8.551 0-4.722-3.89-8.55-8.687-8.55-4.798 0-8.688 3.828-8.688 8.55 0 4.722 3.89 8.55 8.688 8.55z",
			fill: "#FFD21E"
		}),
		/* @__PURE__ */ (0, react_jsx_runtime.jsx)("path", {
			d: "M11.875 15.113c2.457 0 3.25-2.156 3.25-3.263 0-.576-.393-.394-1.023-.089-.582.283-1.365.675-2.224.675-1.798 0-3.25-1.693-3.25-.586 0 1.107.79 3.263 3.25 3.263h-.003z",
			fill: "#FF323D"
		}),
		/* @__PURE__ */ (0, react_jsx_runtime.jsx)("path", {
			d: "M14.76 9.21c.32.108.445.753.767.585.447-.233.707-.708.659-1.204a1.235 1.235 0 00-.879-1.059 1.262 1.262 0 00-1.33.394c-.322.384-.377.92-.14 1.36.153.283.638-.177.925-.079l-.002.003zm-5.887 0c-.32.108-.448.753-.768.585a1.226 1.226 0 01-.658-1.204c.048-.495.395-.913.878-1.059a1.262 1.262 0 011.33.394c.322.384.377.92.14 1.36-.152.283-.64-.177-.925-.079l.003.003zm1.12 5.34a2.166 2.166 0 011.325-1.106c.07-.02.144.06.219.171l.192.306c.069.1.139.175.209.175.074 0 .15-.074.223-.172l.205-.302c.08-.11.157-.188.234-.165.537.168.986.536 1.25 1.026.932-.724 1.275-1.905 1.275-2.633 0-.508-.306-.426-.81-.19l-.616.296c-.52.24-1.148.48-1.824.48-.676 0-1.302-.24-1.823-.48l-.589-.283c-.52-.248-.838-.342-.838.177 0 .703.32 1.831 1.187 2.56l.18.14z",
			fill: "#3A3B45"
		}),
		/* @__PURE__ */ (0, react_jsx_runtime.jsx)("path", {
			d: "M17.812 10.366a.806.806 0 00.813-.8c0-.441-.364-.8-.813-.8a.806.806 0 00-.812.8c0 .442.364.8.812.8zm-11.624 0a.806.806 0 00.812-.8c0-.441-.364-.8-.812-.8a.806.806 0 00-.813.8c0 .442.364.8.813.8zM4.515 13.073c-.405 0-.765.162-1.017.46a1.455 1.455 0 00-.333.925 1.801 1.801 0 00-.485-.074c-.387 0-.737.146-.985.409a1.41 1.41 0 00-.2 1.722 1.302 1.302 0 00-.447.694c-.06.222-.12.69.2 1.166a1.267 1.267 0 00-.093 1.236c.238.533.81.958 1.89 1.405l.24.096c.768.3 1.473.492 1.478.494.89.243 1.808.375 2.732.394 1.465 0 2.513-.443 3.115-1.314.93-1.342.842-2.575-.274-3.763l-.151-.154c-.692-.684-1.155-1.69-1.25-1.912-.195-.655-.71-1.383-1.562-1.383-.46.007-.889.233-1.15.605-.25-.31-.495-.553-.715-.694a1.87 1.87 0 00-.993-.312zm14.97 0c.405 0 .767.162 1.017.46.216.262.333.588.333.925.158-.047.322-.071.487-.074.388 0 .738.146.985.409a1.41 1.41 0 01.2 1.722c.22.178.377.422.445.694.06.222.12.69-.2 1.166.244.37.279.836.093 1.236-.238.533-.81.958-1.889 1.405l-.239.096c-.77.3-1.475.492-1.48.494-.89.243-1.808.375-2.732.394-1.465 0-2.513-.443-3.115-1.314-.93-1.342-.842-2.575.274-3.763l.151-.154c.695-.684 1.157-1.69 1.252-1.912.195-.655.708-1.383 1.56-1.383.46.007.889.233 1.15.605.25-.31.495-.553.718-.694.244-.162.523-.265.814-.3l.176-.012z",
			fill: "#FF9D0B"
		}),
		/* @__PURE__ */ (0, react_jsx_runtime.jsx)("path", {
			d: "M9.785 20.132c.688-.994.638-1.74-.305-2.667-.945-.928-1.495-2.288-1.495-2.288s-.205-.788-.672-.714c-.468.074-.81 1.25.17 1.971.977.721-.195 1.21-.573.534-.375-.677-1.405-2.416-1.94-2.751-.532-.332-.907-.148-.782.541.125.687 2.357 2.35 2.14 2.707-.218.362-.983-.42-.983-.42S2.953 14.9 2.43 15.46c-.52.558.398 1.026 1.7 1.803 1.308.778 1.41.985 1.225 1.28-.187.295-3.07-2.1-3.34-1.083-.27 1.011 2.943 1.304 2.745 2.006-.2.7-2.265-1.324-2.685-.537-.425.79 2.913 1.718 2.94 1.725 1.075.276 3.813.859 4.77-.522zm4.432 0c-.687-.994-.64-1.74.305-2.667.943-.928 1.493-2.288 1.493-2.288s.205-.788.675-.714c.465.074.807 1.25-.17 1.971-.98.721.195 1.21.57.534.377-.677 1.407-2.416 1.94-2.751.532-.332.91-.148.782.541-.125.687-2.355 2.35-2.137 2.707.215.362.98-.42.98-.42S21.05 14.9 21.57 15.46c.52.558-.395 1.026-1.7 1.803-1.308.778-1.408.985-1.225 1.28.187.295 3.07-2.1 3.34-1.083.27 1.011-2.94 1.304-2.743 2.006.2.7 2.263-1.324 2.685-.537.423.79-2.912 1.718-2.94 1.725-1.077.276-3.815.859-4.77-.522z",
			fill: "#FFD21E"
		})
	] }));
});
var Color_default$18 = Icon$40;

//#endregion
//#region node_modules/.pnpm/@lobehub+icons@5.16.0_@types+react@18.3.31_react@18.3.1/node_modules/@lobehub/icons/es/Hunyuan/style.js
var TITLE$38 = "Hunyuan";

//#endregion
//#region node_modules/.pnpm/@lobehub+icons@5.16.0_@types+react@18.3.31_react@18.3.1/node_modules/@lobehub/icons/es/Hunyuan/components/Color.js
function _typeof$39(o) {
	"@babel/helpers - typeof";
	return _typeof$39 = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(o$1) {
		return typeof o$1;
	} : function(o$1) {
		return o$1 && "function" == typeof Symbol && o$1.constructor === Symbol && o$1 !== Symbol.prototype ? "symbol" : typeof o$1;
	}, _typeof$39(o);
}
var _excluded$39 = ["size", "style"];
function ownKeys$39(e, r) {
	var t = Object.keys(e);
	if (Object.getOwnPropertySymbols) {
		var o = Object.getOwnPropertySymbols(e);
		r && (o = o.filter(function(r$1) {
			return Object.getOwnPropertyDescriptor(e, r$1).enumerable;
		})), t.push.apply(t, o);
	}
	return t;
}
function _objectSpread$39(e) {
	for (var r = 1; r < arguments.length; r++) {
		var t = null != arguments[r] ? arguments[r] : {};
		r % 2 ? ownKeys$39(Object(t), !0).forEach(function(r$1) {
			_defineProperty$39(e, r$1, t[r$1]);
		}) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys$39(Object(t)).forEach(function(r$1) {
			Object.defineProperty(e, r$1, Object.getOwnPropertyDescriptor(t, r$1));
		});
	}
	return e;
}
function _defineProperty$39(obj, key, value) {
	key = _toPropertyKey$39(key);
	if (key in obj) Object.defineProperty(obj, key, {
		value,
		enumerable: true,
		configurable: true,
		writable: true
	});
	else obj[key] = value;
	return obj;
}
function _toPropertyKey$39(t) {
	var i = _toPrimitive$39(t, "string");
	return "symbol" == _typeof$39(i) ? i : String(i);
}
function _toPrimitive$39(t, r) {
	if ("object" != _typeof$39(t) || !t) return t;
	var e = t[Symbol.toPrimitive];
	if (void 0 !== e) {
		var i = e.call(t, r || "default");
		if ("object" != _typeof$39(i)) return i;
		throw new TypeError("@@toPrimitive must return a primitive value.");
	}
	return ("string" === r ? String : Number)(t);
}
function _objectWithoutProperties$39(source, excluded) {
	if (source == null) return {};
	var target = _objectWithoutPropertiesLoose$39(source, excluded);
	var key, i;
	if (Object.getOwnPropertySymbols) {
		var sourceSymbolKeys = Object.getOwnPropertySymbols(source);
		for (i = 0; i < sourceSymbolKeys.length; i++) {
			key = sourceSymbolKeys[i];
			if (excluded.indexOf(key) >= 0) continue;
			if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue;
			target[key] = source[key];
		}
	}
	return target;
}
function _objectWithoutPropertiesLoose$39(source, excluded) {
	if (source == null) return {};
	var target = {};
	var sourceKeys = Object.keys(source);
	var key, i;
	for (i = 0; i < sourceKeys.length; i++) {
		key = sourceKeys[i];
		if (excluded.indexOf(key) >= 0) continue;
		target[key] = source[key];
	}
	return target;
}
var Icon$39 = /* @__PURE__ */ (0, react.memo)(function(_ref) {
	var _ref$size = _ref.size, size = _ref$size === void 0 ? "1em" : _ref$size, style = _ref.style, rest = _objectWithoutProperties$39(_ref, _excluded$39);
	return /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("svg", _objectSpread$39(_objectSpread$39({
		height: size,
		style: _objectSpread$39({
			flex: "none",
			lineHeight: 1
		}, style),
		viewBox: "0 0 24 24",
		width: size,
		xmlns: "http://www.w3.org/2000/svg"
	}, rest), {}, { children: [
		/* @__PURE__ */ (0, react_jsx_runtime.jsx)("title", { children: TITLE$38 }),
		/* @__PURE__ */ (0, react_jsx_runtime.jsx)("circle", {
			cx: "12",
			cy: "12",
			fill: "#0055E9",
			r: "12"
		}),
		/* @__PURE__ */ (0, react_jsx_runtime.jsx)("path", {
			d: "M12 0c.518 0 1.028.033 1.528.096A6.188 6.188 0 0112.12 12.28l-.12.001c-2.99 0-5.242 2.179-5.554 5.11-.223 2.086.353 4.412 2.242 6.146C3.672 22.1 0 17.479 0 12 0 5.373 5.373 0 12 0z",
			fill: "#A8DFF5"
		}),
		/* @__PURE__ */ (0, react_jsx_runtime.jsx)("path", {
			d: "M5.286 5a2.438 2.438 0 01.682 3.38c-3.962 5.966-3.215 10.743 2.648 15.136C3.636 22.056 0 17.452 0 12c0-1.787.39-3.482 1.09-5.006.253-.435.525-.872.817-1.311A2.438 2.438 0 015.286 5z",
			fill: "#0055E9"
		}),
		/* @__PURE__ */ (0, react_jsx_runtime.jsx)("path", {
			d: "M12.98.04c.272.021.543.053.81.093.583.106 1.117.254 1.538.44 6.638 2.927 8.07 10.052 1.748 15.642a4.125 4.125 0 01-5.822-.358c-1.51-1.706-1.3-4.184.357-5.822.858-.848 3.108-1.223 4.045-2.441 1.257-1.634 2.122-6.009-2.523-7.506L12.98.039z",
			fill: "#00BCFF"
		}),
		/* @__PURE__ */ (0, react_jsx_runtime.jsx)("path", {
			d: "M13.528.096A6.187 6.187 0 0112 12.281a5.75 5.75 0 00-1.71.255c.147-.905.595-1.784 1.321-2.501.858-.848 3.108-1.223 4.045-2.441 1.27-1.651 2.14-6.104-2.676-7.554.184.014.367.033.548.056z",
			fill: "#ECECEE"
		})
	] }));
});
var Color_default$19 = Icon$39;

//#endregion
//#region node_modules/.pnpm/@lobehub+icons@5.16.0_@types+react@18.3.31_react@18.3.1/node_modules/@lobehub/icons/es/Hyperbolic/style.js
var TITLE$37 = "Hyperbolic";

//#endregion
//#region node_modules/.pnpm/@lobehub+icons@5.16.0_@types+react@18.3.31_react@18.3.1/node_modules/@lobehub/icons/es/Hyperbolic/components/Color.js
function _typeof$38(o) {
	"@babel/helpers - typeof";
	return _typeof$38 = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(o$1) {
		return typeof o$1;
	} : function(o$1) {
		return o$1 && "function" == typeof Symbol && o$1.constructor === Symbol && o$1 !== Symbol.prototype ? "symbol" : typeof o$1;
	}, _typeof$38(o);
}
var _excluded$38 = ["size", "style"];
function ownKeys$38(e, r) {
	var t = Object.keys(e);
	if (Object.getOwnPropertySymbols) {
		var o = Object.getOwnPropertySymbols(e);
		r && (o = o.filter(function(r$1) {
			return Object.getOwnPropertyDescriptor(e, r$1).enumerable;
		})), t.push.apply(t, o);
	}
	return t;
}
function _objectSpread$38(e) {
	for (var r = 1; r < arguments.length; r++) {
		var t = null != arguments[r] ? arguments[r] : {};
		r % 2 ? ownKeys$38(Object(t), !0).forEach(function(r$1) {
			_defineProperty$38(e, r$1, t[r$1]);
		}) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys$38(Object(t)).forEach(function(r$1) {
			Object.defineProperty(e, r$1, Object.getOwnPropertyDescriptor(t, r$1));
		});
	}
	return e;
}
function _defineProperty$38(obj, key, value) {
	key = _toPropertyKey$38(key);
	if (key in obj) Object.defineProperty(obj, key, {
		value,
		enumerable: true,
		configurable: true,
		writable: true
	});
	else obj[key] = value;
	return obj;
}
function _toPropertyKey$38(t) {
	var i = _toPrimitive$38(t, "string");
	return "symbol" == _typeof$38(i) ? i : String(i);
}
function _toPrimitive$38(t, r) {
	if ("object" != _typeof$38(t) || !t) return t;
	var e = t[Symbol.toPrimitive];
	if (void 0 !== e) {
		var i = e.call(t, r || "default");
		if ("object" != _typeof$38(i)) return i;
		throw new TypeError("@@toPrimitive must return a primitive value.");
	}
	return ("string" === r ? String : Number)(t);
}
function _objectWithoutProperties$38(source, excluded) {
	if (source == null) return {};
	var target = _objectWithoutPropertiesLoose$38(source, excluded);
	var key, i;
	if (Object.getOwnPropertySymbols) {
		var sourceSymbolKeys = Object.getOwnPropertySymbols(source);
		for (i = 0; i < sourceSymbolKeys.length; i++) {
			key = sourceSymbolKeys[i];
			if (excluded.indexOf(key) >= 0) continue;
			if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue;
			target[key] = source[key];
		}
	}
	return target;
}
function _objectWithoutPropertiesLoose$38(source, excluded) {
	if (source == null) return {};
	var target = {};
	var sourceKeys = Object.keys(source);
	var key, i;
	for (i = 0; i < sourceKeys.length; i++) {
		key = sourceKeys[i];
		if (excluded.indexOf(key) >= 0) continue;
		target[key] = source[key];
	}
	return target;
}
var Icon$38 = /* @__PURE__ */ (0, react.memo)(function(_ref) {
	var _ref$size = _ref.size, size = _ref$size === void 0 ? "1em" : _ref$size, style = _ref.style, rest = _objectWithoutProperties$38(_ref, _excluded$38);
	return /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("svg", _objectSpread$38(_objectSpread$38({
		height: size,
		style: _objectSpread$38({
			flex: "none",
			lineHeight: 1
		}, style),
		viewBox: "0 0 24 24",
		width: size,
		xmlns: "http://www.w3.org/2000/svg"
	}, rest), {}, { children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)("title", { children: TITLE$37 }), /* @__PURE__ */ (0, react_jsx_runtime.jsx)("path", {
		d: "M.193 19.503a2.413 2.413 0 00-.186.925c0 1.317 1.112 2.518 2.95 3.437a1.337 1.337 0 001.838-.738l2.049-4.93c.359-.857.642-1.745.846-2.652-3.795.637-6.656 2.092-7.448 3.872l-.032.076-.017.01zm7.49-11.047a15.981 15.981 0 00-.846-2.653L4.79.873a1.34 1.34 0 00-1.84-.738C1.112 1.054 0 2.256 0 3.573c0 .317.064.631.186.924v.01l.032.077c.81 1.78 3.67 3.234 7.466 3.872zM21.049.136c1.838.918 2.95 2.12 2.95 3.436a2.454 2.454 0 01-.196.925l-.027.063c-.785 1.792-3.653 3.254-7.46 3.896.204-.907.487-1.795.846-2.653L19.21.873a1.337 1.337 0 011.839-.738zm-4.722 15.409c.201.906.48 1.793.837 2.65l2.048 4.932a1.338 1.338 0 001.838.738c1.839-.92 2.951-2.12 2.951-3.437a2.446 2.446 0 00-.186-.925l-.027-.062c-.782-1.792-3.66-3.256-7.46-3.896zm-.129-6.04c2.695-.415 4.935-1.223 6.48-2.278L22.24 8.28a9.755 9.755 0 000 7.437l.435 1.048c-1.547-1.055-3.787-1.855-6.479-2.275l-.07-.01A27.196 27.196 0 0012 14.172c-1.377-.002-2.752.1-4.114.307l-.071.01c-2.693.413-4.933 1.222-6.48 2.277l.437-1.05a9.755 9.755 0 000-7.437l-.437-1.052c1.54 1.06 3.78 1.863 6.473 2.278l.071.01c2.734.407 5.513.407 8.246 0l.071-.01z",
		fill: "#594CE9"
	})] }));
});
var Color_default$20 = Icon$38;

//#endregion
//#region node_modules/.pnpm/@lobehub+icons@5.16.0_@types+react@18.3.31_react@18.3.1/node_modules/@lobehub/icons/es/IFlyTekCloud/style.js
var TITLE$36 = "iFlyTekCloud";

//#endregion
//#region node_modules/.pnpm/@lobehub+icons@5.16.0_@types+react@18.3.31_react@18.3.1/node_modules/@lobehub/icons/es/IFlyTekCloud/components/Color.js
function _typeof$37(o) {
	"@babel/helpers - typeof";
	return _typeof$37 = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(o$1) {
		return typeof o$1;
	} : function(o$1) {
		return o$1 && "function" == typeof Symbol && o$1.constructor === Symbol && o$1 !== Symbol.prototype ? "symbol" : typeof o$1;
	}, _typeof$37(o);
}
var _excluded$37 = ["size", "style"];
function ownKeys$37(e, r) {
	var t = Object.keys(e);
	if (Object.getOwnPropertySymbols) {
		var o = Object.getOwnPropertySymbols(e);
		r && (o = o.filter(function(r$1) {
			return Object.getOwnPropertyDescriptor(e, r$1).enumerable;
		})), t.push.apply(t, o);
	}
	return t;
}
function _objectSpread$37(e) {
	for (var r = 1; r < arguments.length; r++) {
		var t = null != arguments[r] ? arguments[r] : {};
		r % 2 ? ownKeys$37(Object(t), !0).forEach(function(r$1) {
			_defineProperty$37(e, r$1, t[r$1]);
		}) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys$37(Object(t)).forEach(function(r$1) {
			Object.defineProperty(e, r$1, Object.getOwnPropertyDescriptor(t, r$1));
		});
	}
	return e;
}
function _defineProperty$37(obj, key, value) {
	key = _toPropertyKey$37(key);
	if (key in obj) Object.defineProperty(obj, key, {
		value,
		enumerable: true,
		configurable: true,
		writable: true
	});
	else obj[key] = value;
	return obj;
}
function _toPropertyKey$37(t) {
	var i = _toPrimitive$37(t, "string");
	return "symbol" == _typeof$37(i) ? i : String(i);
}
function _toPrimitive$37(t, r) {
	if ("object" != _typeof$37(t) || !t) return t;
	var e = t[Symbol.toPrimitive];
	if (void 0 !== e) {
		var i = e.call(t, r || "default");
		if ("object" != _typeof$37(i)) return i;
		throw new TypeError("@@toPrimitive must return a primitive value.");
	}
	return ("string" === r ? String : Number)(t);
}
function _objectWithoutProperties$37(source, excluded) {
	if (source == null) return {};
	var target = _objectWithoutPropertiesLoose$37(source, excluded);
	var key, i;
	if (Object.getOwnPropertySymbols) {
		var sourceSymbolKeys = Object.getOwnPropertySymbols(source);
		for (i = 0; i < sourceSymbolKeys.length; i++) {
			key = sourceSymbolKeys[i];
			if (excluded.indexOf(key) >= 0) continue;
			if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue;
			target[key] = source[key];
		}
	}
	return target;
}
function _objectWithoutPropertiesLoose$37(source, excluded) {
	if (source == null) return {};
	var target = {};
	var sourceKeys = Object.keys(source);
	var key, i;
	for (i = 0; i < sourceKeys.length; i++) {
		key = sourceKeys[i];
		if (excluded.indexOf(key) >= 0) continue;
		target[key] = source[key];
	}
	return target;
}
var Icon$37 = /* @__PURE__ */ (0, react.memo)(function(_ref) {
	var _ref$size = _ref.size, size = _ref$size === void 0 ? "1em" : _ref$size, style = _ref.style, rest = _objectWithoutProperties$37(_ref, _excluded$37);
	return /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("svg", _objectSpread$37(_objectSpread$37({
		height: size,
		style: _objectSpread$37({
			flex: "none",
			lineHeight: 1
		}, style),
		viewBox: "0 0 24 24",
		width: size,
		xmlns: "http://www.w3.org/2000/svg"
	}, rest), {}, { children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)("title", { children: TITLE$36 }), /* @__PURE__ */ (0, react_jsx_runtime.jsx)("path", {
		d: "M20.713 6.655c-.414-1.426-1.748-2.472-3.357-2.472a3.62 3.62 0 00-1.7.423C14.62 3.046 12.804 2 10.735 2 7.77 2 5.31 4.16 4.943 6.944 2.138 7.39 0 9.728 0 12.58c0 3.14 2.62 5.68 5.862 5.68 1.61 0 3.08-.646 4.138-1.671.276-.267.529-.557.736-.89a5.02 5.02 0 01-.713.845 8.998 8.998 0 00-1.77 5.39V22a16.682 16.682 0 018.666-2.717h.046c3.035 0 5.633-1.871 6.621-4.499A6.599 6.599 0 0024 12.445c0-2.427-1.31-4.565-3.287-5.79zM6.966 12.869a.836.836 0 01-.851.824.81.81 0 01-.805-.824v-2.183a.81.81 0 01.805-.824c.46 0 .85.379.85.824v2.183zm3.011 1.069a.86.86 0 01-.874.846.86.86 0 01-.873-.846v-4.9a.86.86 0 01.873-.846.86.86 0 01.874.846v4.9zm3.104-1.047c0 .445-.414.824-.874.824s-.85-.379-.85-.824v-2.227c0-.446.367-.824.85-.824.46 0 .873.378.873.824v2.227zm3.149 1.069a.86.86 0 01-.874.846.86.86 0 01-.873-.846v-4.9a.86.86 0 01.873-.846.86.86 0 01.874.846v4.9zm3.08-1.091a.836.836 0 01-.85.824.81.81 0 01-.805-.824v-2.183a.81.81 0 01.805-.824c.46 0 .85.379.85.824v2.183z",
		fill: "#2A80E2"
	})] }));
});
var Color_default$21 = Icon$37;

//#endregion
//#region node_modules/.pnpm/@lobehub+icons@5.16.0_@types+react@18.3.31_react@18.3.1/node_modules/@lobehub/icons/es/InternLM/style.js
var TITLE$35 = "InternLM";

//#endregion
//#region node_modules/.pnpm/@lobehub+icons@5.16.0_@types+react@18.3.31_react@18.3.1/node_modules/@lobehub/icons/es/InternLM/components/Color.js
function _typeof$36(o) {
	"@babel/helpers - typeof";
	return _typeof$36 = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(o$1) {
		return typeof o$1;
	} : function(o$1) {
		return o$1 && "function" == typeof Symbol && o$1.constructor === Symbol && o$1 !== Symbol.prototype ? "symbol" : typeof o$1;
	}, _typeof$36(o);
}
var _excluded$36 = ["size", "style"];
function ownKeys$36(e, r) {
	var t = Object.keys(e);
	if (Object.getOwnPropertySymbols) {
		var o = Object.getOwnPropertySymbols(e);
		r && (o = o.filter(function(r$1) {
			return Object.getOwnPropertyDescriptor(e, r$1).enumerable;
		})), t.push.apply(t, o);
	}
	return t;
}
function _objectSpread$36(e) {
	for (var r = 1; r < arguments.length; r++) {
		var t = null != arguments[r] ? arguments[r] : {};
		r % 2 ? ownKeys$36(Object(t), !0).forEach(function(r$1) {
			_defineProperty$36(e, r$1, t[r$1]);
		}) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys$36(Object(t)).forEach(function(r$1) {
			Object.defineProperty(e, r$1, Object.getOwnPropertyDescriptor(t, r$1));
		});
	}
	return e;
}
function _defineProperty$36(obj, key, value) {
	key = _toPropertyKey$36(key);
	if (key in obj) Object.defineProperty(obj, key, {
		value,
		enumerable: true,
		configurable: true,
		writable: true
	});
	else obj[key] = value;
	return obj;
}
function _toPropertyKey$36(t) {
	var i = _toPrimitive$36(t, "string");
	return "symbol" == _typeof$36(i) ? i : String(i);
}
function _toPrimitive$36(t, r) {
	if ("object" != _typeof$36(t) || !t) return t;
	var e = t[Symbol.toPrimitive];
	if (void 0 !== e) {
		var i = e.call(t, r || "default");
		if ("object" != _typeof$36(i)) return i;
		throw new TypeError("@@toPrimitive must return a primitive value.");
	}
	return ("string" === r ? String : Number)(t);
}
function _objectWithoutProperties$36(source, excluded) {
	if (source == null) return {};
	var target = _objectWithoutPropertiesLoose$36(source, excluded);
	var key, i;
	if (Object.getOwnPropertySymbols) {
		var sourceSymbolKeys = Object.getOwnPropertySymbols(source);
		for (i = 0; i < sourceSymbolKeys.length; i++) {
			key = sourceSymbolKeys[i];
			if (excluded.indexOf(key) >= 0) continue;
			if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue;
			target[key] = source[key];
		}
	}
	return target;
}
function _objectWithoutPropertiesLoose$36(source, excluded) {
	if (source == null) return {};
	var target = {};
	var sourceKeys = Object.keys(source);
	var key, i;
	for (i = 0; i < sourceKeys.length; i++) {
		key = sourceKeys[i];
		if (excluded.indexOf(key) >= 0) continue;
		target[key] = source[key];
	}
	return target;
}
var Icon$36 = /* @__PURE__ */ (0, react.memo)(function(_ref) {
	var _ref$size = _ref.size, size = _ref$size === void 0 ? "1em" : _ref$size, style = _ref.style, rest = _objectWithoutProperties$36(_ref, _excluded$36);
	return /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("svg", _objectSpread$36(_objectSpread$36({
		height: size,
		style: _objectSpread$36({
			flex: "none",
			lineHeight: 1
		}, style),
		viewBox: "0 0 24 24",
		width: size,
		xmlns: "http://www.w3.org/2000/svg"
	}, rest), {}, { children: [
		/* @__PURE__ */ (0, react_jsx_runtime.jsx)("title", { children: TITLE$35 }),
		/* @__PURE__ */ (0, react_jsx_runtime.jsx)("path", {
			d: "M5.54 19.662s2.24-.25 2.365-.29c.125-.042 2.45.082 2.45.082l1.493.374 1.37.498.373.125 2.033-.748 2.45-.373 1.659.041 1.286.166.54.166-.042 2.242-1.12-.291-2.159-.166-1.494.124-1.286.291-1.161.374-.83.332-1.744-.664-2.116-.416H7.158l-1.618.291v-2.158z",
			fill: "#858599",
			fillOpacity: ".5"
		}),
		/* @__PURE__ */ (0, react_jsx_runtime.jsx)("path", {
			d: "M13.46 23c-3.773-2.078-7.78-.832-7.82-.819l-.453.144v-2.86l.24-.078c.174-.056 4.324-1.354 8.366.871l-.333.607c-3.244-1.786-6.66-1.115-7.58-.885V21.4c1.203-.286 4.595-.834 7.913.993L13.46 23V23z",
			fill: "#858599"
		}),
		/* @__PURE__ */ (0, react_jsx_runtime.jsx)("path", {
			d: "M13.413 23l-.334-.607c3.319-1.827 6.71-1.279 7.914-.993v-1.419c-.92-.231-4.337-.9-7.58.885l-.334-.607c4.042-2.225 8.192-.927 8.366-.87l.24.077v2.862l-.452-.147c-.04-.013-4.046-1.258-7.82.819z",
			fill: "#858599"
		}),
		/* @__PURE__ */ (0, react_jsx_runtime.jsx)("path", {
			d: "M17.756 16.476a.904.904 0 00-.264-.651.822.822 0 00-.632-.255.997.997 0 00-.644.293c-.175.212-.26.433-.259.685a.874.874 0 00.256.632c.175.187.39.272.644.255.246 0 .459-.1.633-.293a.97.97 0 00.268-.667l-.002.001zM10.769 17.143a.928.928 0 00.264-.658.993.993 0 00-.262-.679.908.908 0 00-.633-.227 1.089 1.089 0 00-.644.274 1.005 1.005 0 00-.265.685c0 .25.089.465.264.643.17.187.383.271.636.255.26-.008.471-.1.639-.293z",
			fill: "#858599",
			fillOpacity: ".5"
		}),
		/* @__PURE__ */ (0, react_jsx_runtime.jsx)("path", {
			d: "M13.4 19.65c-.693 0-1.374-.058-1.895-.192-1.403-.36-2.52-1.01-3.413-1.986-.929-1.017-.988-1.996-1.05-3.033-.008-.133-.016-.267-.026-.405-.083-1.147-.626-2.941-.631-2.958l-.043-.141.086-.119A6.966 6.966 0 019.44 8.441c1.128-.47 2.47-.716 4.105-.752 2.721-.159 5.688.973 7.056 2.692l.086.109-.62 2.89c-.006.155-.052.968-.276 2.63-.263 1.947-2.668 3.061-3.903 3.377-.628.162-1.57.262-2.488.262zm-6.41-8.603c.134.46.538 1.912.613 2.944.01.139.018.277.026.412.06 1.01.109 1.809.896 2.672.815.89 1.837 1.484 3.125 1.814 1.092.28 3.061.194 4.091-.071.887-.228 3.24-1.19 3.468-2.889.24-1.786.272-2.593.273-2.6v-.026l.572-2.664c-.9-1.728-1.433-2.082-2.578-2.514-1.206-.455-2.677.075-3.903.148h-.01c-3.126.068-5.418-.935-6.574 2.773h.001z",
			fill: "#858599"
		}),
		/* @__PURE__ */ (0, react_jsx_runtime.jsx)("path", {
			d: "M19.545 10.862c.223.573.317.86.526 1.386 0 0 .552-.887.727-1.522.175-.641.068-1.458-.07-2.221-.344-1.282-.612-1.381-1.647-2.14a8.668 8.668 0 00-1.565-.84 12.303 12.303 0 00-3.83-.8 12.175 12.175 0 00-3.842.57 8.258 8.258 0 00-1.602.745c-1.075.695-1.823 1.674-2.24 2.932-.112.473-.29.927-.245 1.365.2 2.01 1.512 2.893 1.422 2.409-.117-.625-.042-.994.119-1.592.304-1.13 1.025-1.965 2.163-2.497h.004c.221-.062 1.344-.7 2.834.062.396.17 1.088.629 1.434.618.347-.01.846-.345 1.21-.572.683-.428 1.33-.574 2.184-.303 1.243.39 2.005 1.274 2.418 2.401z",
			fill: "#858599"
		}),
		/* @__PURE__ */ (0, react_jsx_runtime.jsx)("path", {
			d: "M1.217 9.86l.934.274 1.071-.055.77-.522.825-.742.604-.825.77-.797.741-.467 1.016-.22-.687 1.209-.577.576-1.209 1.676-.549.825-.632.44-.907.604s-.797.165-.879.192c-.081.028-.741.138-.741.138l-.577-.028-.44-.137.412-.825.056-.604v-.714l-.001.002z",
			fill: "#858599",
			fillOpacity: ".5"
		}),
		/* @__PURE__ */ (0, react_jsx_runtime.jsx)("path", {
			d: "M3.607 5.108l-.083.63-.22.441-.274.412-.688.412.825.412.907.357.934.193.412.028.99-.688 1.043-.934-.357-.11-1.29-.137-.963-.358-.687-.356-.55-.302z",
			fill: "#858599",
			fillOpacity: ".5"
		}),
		/* @__PURE__ */ (0, react_jsx_runtime.jsx)("path", {
			d: "M1.521 12.399c-.29 0-.596-.018-.917-.051L0 12.278l.298-.19.159-.173c.022-.033.085-.144.19-.377v-.002c.17-.365.228-.975.177-1.813l-.036-.564.435.36c.454.376 1.024.466 1.74.272.64-.182 1.337-.78 2.068-1.774.673-.968 1.64-1.624 2.88-1.952l.116-.031.783.61-.704-.05a2.182 2.182 0 00-.191.206l-.014.017-.018.016c-.404.718-.982 1.426-1.56 2.201l-.008.014c-.089.156-.18.317-.279.477v.009l-.032.051c-.592.962-1.243 1.683-1.935 2.145-.635.445-1.49.67-2.548.67v-.001zm-.5-.505c1.194.077 2.124-.112 2.77-.567l.005-.003c.626-.417 1.223-1.078 1.773-1.964a.244.244 0 01.041-.074c.098-.159.19-.321.28-.48v-.001c.392-.75.842-1.417 1.343-1.988-.748.33-1.341.82-1.8 1.481l-.004.006c-.808 1.101-1.572 1.742-2.333 1.958-.673.182-1.263.15-1.764-.095.01.69-.068 1.207-.237 1.573-.026.058-.05.108-.072.153h-.002z",
			fill: "#858599"
		}),
		/* @__PURE__ */ (0, react_jsx_runtime.jsx)("path", {
			d: "M1.577 12.399c-.29 0-.596-.018-.917-.051l.05-.486c1.371.145 2.425-.035 3.136-.535l.006-.003c.626-.417 1.222-1.078 1.772-1.963a.277.277 0 01.079-.116l.32.37a.22.22 0 00.072-.141l-.005.058-.03.052c-.592.962-1.243 1.683-1.935 2.145-.636.445-1.49.67-2.548.67zM5.751 7.717a9.381 9.381 0 01-.311.016c-.823.029-1.7-.2-2.615-.682.792-.512 1.013-1.096.982-1.621.189.15.386.281.591.393 1.345.758 2.766.878 5.195.198l-.165-.46c-2.308.637-3.558.532-4.793-.165a3.803 3.803 0 01-.967-.759l-.033-.036-.5-.542.094.697c.014.058.3 1.417-1.01 2.08l-.398.201.383.228c1.073.638 2.114.96 3.094.96l.453-.507v-.001zM11.93 15.21a.405.405 0 01-.366-.253c-.326-.745-.582-1.055-.969-1.525-.39-.474-1.223-1.277-1.36-1.393-.184-.156-.236-.368-.126-.515.055-.072.219-.219.556.005.683.452 2.198 1.812 2.608 2.904.15.397 0 .667-.201.749a.367.367 0 01-.143.028h.001zM14.877 15.23a.37.37 0 01-.146-.03c-.201-.085-.346-.357-.192-.752.424-1.086 1.957-2.427 2.645-2.87.34-.22.502-.072.556.002.109.147.054.358-.131.512-.139.115-.982.905-1.379 1.376-.392.465-.651.772-.988 1.513a.404.404 0 01-.364.25v-.002z",
			fill: "#858599"
		}),
		/* @__PURE__ */ (0, react_jsx_runtime.jsx)("path", {
			d: "M16.382 3.316c.01-.566-.265-1.054-.827-1.462-.57-.4-1.252-.602-2.045-.608-.792-.006-1.471.189-2.031.587-.563.401-.85.884-.857 1.445.002.176.017.336.04.486 2.1-.676 3.981-.62 5.64.167.045-.21.072-.414.08-.616v.001z",
			fill: "#858599",
			fillOpacity: ".5"
		}),
		/* @__PURE__ */ (0, react_jsx_runtime.jsx)("path", {
			d: "M7.6 14.716l-.01-.024a1.824 1.824 0 01-.072-.192l-.059-.189-.388.013-.03.326c.002.013.009.044.016.1v.011c.003.02.004.036.008.052a.555.555 0 01-.164.431c-.112.12-.258.172-.45.164-.24-.01-.32-.105-.358-.176-.105-.19-.112-.291-.107-.336.015-.123.04-.254.077-.385.055-.206.013-.444-.126-.708l-.143-.272a1.787 1.787 0 01-.14-.384.974.974 0 01.022-.458.641.641 0 01.264-.374.695.695 0 01.496-.1l.015.002h.015c.192 0 .349.02.469.051a2.208 2.208 0 01-.027-.58 1.5 1.5 0 00-.38-.107H6.52l-.095-.008a1.369 1.369 0 00-.826.189c-.272.16-.456.394-.544.7a1.691 1.691 0 00-.03.815c.008.041.017.09.033.136.043.135.113.285.21.446.148.243.193.323.205.35l.005.009c.018.033.022.084.01.15l-.005.023a7.4 7.4 0 01-.034.172c-.115.298-.127.574-.036.815a.964.964 0 00.486.558c.134.066.288.108.46.125.094.01.192.01.294.005a.957.957 0 00.784-.454 1.13 1.13 0 00.17-.87l-.004-.026H7.6zM21.925 12.059a1.165 1.165 0 00-.556-.697h-.001a1.325 1.325 0 00-.797-.175l-.031.003-.093.011h-.008a1.553 1.553 0 00-.528.197 1.959 1.959 0 01-.016.563l.1-.04c.128-.053.302-.095.532-.13l.013-.002a.567.567 0 01.474.103c.155.113.26.254.32.428.05.164.057.305.022.43a2.77 2.77 0 01-.144.41 9.169 9.169 0 01-.191.383.908.908 0 00-.102.57c.024.176.05.322.078.446a.608.608 0 01-.036.329l-.003.006c-.037.117-.235.18-.35.208-.263.063-.381-.033-.451-.12a.78.78 0 01-.173-.51l.004-.053a.806.806 0 01.014-.093l-.008-.337-.431.01-.046.185a1.285 1.285 0 01-.064.188l-.011.027-.005.029c-.05.307.013.598.187.868l.004.006c.19.274.463.426.787.437.087.005.17.002.25-.004.192-.018.363-.069.509-.15a.992.992 0 00.459-.567c.085-.252.068-.527-.05-.816l-.03-.171-.002-.013a.306.306 0 01.015-.18c.045-.108.106-.233.181-.375.098-.173.162-.32.196-.444a.665.665 0 00.033-.152 1.75 1.75 0 00-.053-.806l.002-.002zM16.59 3.853c.033-.185.053-.359.06-.533.012-.648-.301-1.209-.93-1.667-.609-.427-1.344-.646-2.184-.653-.843-.008-1.575.207-2.176.633-.628.45-.951 1.002-.96 1.643v.006c.002.128.01.256.026.39a.38.38 0 00-.095.23v.01c0 .216.032.433.097.643l.001.006c.09.265.245.518.46.75l.063.068.567.063c.485.282 1.132.433 1.928.447h.103c.587 0 1.1-.072 1.527-.213l.011-.004c.16-.063.316-.138.465-.224.452.043.791-.18.965-.633l.043-.046-.002-.065c.067-.205.184-.608.03-.851h.001zM11.643 2.03c.514-.365 1.149-.547 1.888-.542.74.006 1.38.196 1.903.562.497.361.735.774.727 1.255-.004.089-.01.18-.023.274a6.882 6.882 0 00-2.685-.527c-.816 0-1.67.13-2.558.39a4.038 4.038 0 01-.006-.165c.006-.482.253-.89.754-1.247zm4.513 2.293l-.165.357s-.215.311-.45.272l-.092-.015-.078.049a2.724 2.724 0 01-.454.226c-.397.13-.89.192-1.462.184-.708-.014-1.276-.14-1.688-.38l-.037-.021-.048-.03-.491-.054c-.094-.11-.226-.34-.226-.34l-.135-.392-.008-.204c1.988-.626 3.79-.574 5.355.155.002.029-.02.193-.02.193zm.147.364v-.004l.003.004h-.003z",
			fill: "#858599"
		})
	] }));
});
var Color_default$22 = Icon$36;

//#endregion
//#region node_modules/.pnpm/@lobehub+icons@5.16.0_@types+react@18.3.31_react@18.3.1/node_modules/@lobehub/icons/es/Jina/style.js
var TITLE$34 = "Jina";

//#endregion
//#region node_modules/.pnpm/@lobehub+icons@5.16.0_@types+react@18.3.31_react@18.3.1/node_modules/@lobehub/icons/es/Jina/components/Mono.js
function _typeof$35(o) {
	"@babel/helpers - typeof";
	return _typeof$35 = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(o$1) {
		return typeof o$1;
	} : function(o$1) {
		return o$1 && "function" == typeof Symbol && o$1.constructor === Symbol && o$1 !== Symbol.prototype ? "symbol" : typeof o$1;
	}, _typeof$35(o);
}
var _excluded$35 = ["size", "style"];
function ownKeys$35(e, r) {
	var t = Object.keys(e);
	if (Object.getOwnPropertySymbols) {
		var o = Object.getOwnPropertySymbols(e);
		r && (o = o.filter(function(r$1) {
			return Object.getOwnPropertyDescriptor(e, r$1).enumerable;
		})), t.push.apply(t, o);
	}
	return t;
}
function _objectSpread$35(e) {
	for (var r = 1; r < arguments.length; r++) {
		var t = null != arguments[r] ? arguments[r] : {};
		r % 2 ? ownKeys$35(Object(t), !0).forEach(function(r$1) {
			_defineProperty$35(e, r$1, t[r$1]);
		}) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys$35(Object(t)).forEach(function(r$1) {
			Object.defineProperty(e, r$1, Object.getOwnPropertyDescriptor(t, r$1));
		});
	}
	return e;
}
function _defineProperty$35(obj, key, value) {
	key = _toPropertyKey$35(key);
	if (key in obj) Object.defineProperty(obj, key, {
		value,
		enumerable: true,
		configurable: true,
		writable: true
	});
	else obj[key] = value;
	return obj;
}
function _toPropertyKey$35(t) {
	var i = _toPrimitive$35(t, "string");
	return "symbol" == _typeof$35(i) ? i : String(i);
}
function _toPrimitive$35(t, r) {
	if ("object" != _typeof$35(t) || !t) return t;
	var e = t[Symbol.toPrimitive];
	if (void 0 !== e) {
		var i = e.call(t, r || "default");
		if ("object" != _typeof$35(i)) return i;
		throw new TypeError("@@toPrimitive must return a primitive value.");
	}
	return ("string" === r ? String : Number)(t);
}
function _objectWithoutProperties$35(source, excluded) {
	if (source == null) return {};
	var target = _objectWithoutPropertiesLoose$35(source, excluded);
	var key, i;
	if (Object.getOwnPropertySymbols) {
		var sourceSymbolKeys = Object.getOwnPropertySymbols(source);
		for (i = 0; i < sourceSymbolKeys.length; i++) {
			key = sourceSymbolKeys[i];
			if (excluded.indexOf(key) >= 0) continue;
			if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue;
			target[key] = source[key];
		}
	}
	return target;
}
function _objectWithoutPropertiesLoose$35(source, excluded) {
	if (source == null) return {};
	var target = {};
	var sourceKeys = Object.keys(source);
	var key, i;
	for (i = 0; i < sourceKeys.length; i++) {
		key = sourceKeys[i];
		if (excluded.indexOf(key) >= 0) continue;
		target[key] = source[key];
	}
	return target;
}
var Icon$35 = /* @__PURE__ */ (0, react.memo)(function(_ref) {
	var _ref$size = _ref.size, size = _ref$size === void 0 ? "1em" : _ref$size, style = _ref.style, rest = _objectWithoutProperties$35(_ref, _excluded$35);
	return /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("svg", _objectSpread$35(_objectSpread$35({
		fill: "currentColor",
		fillRule: "evenodd",
		height: size,
		style: _objectSpread$35({
			flex: "none",
			lineHeight: 1
		}, style),
		viewBox: "0 0 24 24",
		width: size,
		xmlns: "http://www.w3.org/2000/svg"
	}, rest), {}, { children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)("title", { children: TITLE$34 }), /* @__PURE__ */ (0, react_jsx_runtime.jsx)("path", { d: "M6.608 21.416a4.608 4.608 0 100-9.217 4.608 4.608 0 000 9.217zM20.894 2.015c.614 0 1.106.492 1.106 1.106v9.002c0 5.13-4.148 9.309-9.217 9.37v-9.355l-.03-9.032c0-.614.491-1.106 1.106-1.106h7.158l-.123.015z" })] }));
});
var Mono_default$4 = Icon$35;

//#endregion
//#region node_modules/.pnpm/@lobehub+icons@5.16.0_@types+react@18.3.31_react@18.3.1/node_modules/@lobehub/icons/es/Kimi/style.js
var TITLE$33 = "Kimi";

//#endregion
//#region node_modules/.pnpm/@lobehub+icons@5.16.0_@types+react@18.3.31_react@18.3.1/node_modules/@lobehub/icons/es/Kimi/components/Color.js
function _typeof$34(o) {
	"@babel/helpers - typeof";
	return _typeof$34 = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(o$1) {
		return typeof o$1;
	} : function(o$1) {
		return o$1 && "function" == typeof Symbol && o$1.constructor === Symbol && o$1 !== Symbol.prototype ? "symbol" : typeof o$1;
	}, _typeof$34(o);
}
var _excluded$34 = ["size", "style"];
function ownKeys$34(e, r) {
	var t = Object.keys(e);
	if (Object.getOwnPropertySymbols) {
		var o = Object.getOwnPropertySymbols(e);
		r && (o = o.filter(function(r$1) {
			return Object.getOwnPropertyDescriptor(e, r$1).enumerable;
		})), t.push.apply(t, o);
	}
	return t;
}
function _objectSpread$34(e) {
	for (var r = 1; r < arguments.length; r++) {
		var t = null != arguments[r] ? arguments[r] : {};
		r % 2 ? ownKeys$34(Object(t), !0).forEach(function(r$1) {
			_defineProperty$34(e, r$1, t[r$1]);
		}) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys$34(Object(t)).forEach(function(r$1) {
			Object.defineProperty(e, r$1, Object.getOwnPropertyDescriptor(t, r$1));
		});
	}
	return e;
}
function _defineProperty$34(obj, key, value) {
	key = _toPropertyKey$34(key);
	if (key in obj) Object.defineProperty(obj, key, {
		value,
		enumerable: true,
		configurable: true,
		writable: true
	});
	else obj[key] = value;
	return obj;
}
function _toPropertyKey$34(t) {
	var i = _toPrimitive$34(t, "string");
	return "symbol" == _typeof$34(i) ? i : String(i);
}
function _toPrimitive$34(t, r) {
	if ("object" != _typeof$34(t) || !t) return t;
	var e = t[Symbol.toPrimitive];
	if (void 0 !== e) {
		var i = e.call(t, r || "default");
		if ("object" != _typeof$34(i)) return i;
		throw new TypeError("@@toPrimitive must return a primitive value.");
	}
	return ("string" === r ? String : Number)(t);
}
function _objectWithoutProperties$34(source, excluded) {
	if (source == null) return {};
	var target = _objectWithoutPropertiesLoose$34(source, excluded);
	var key, i;
	if (Object.getOwnPropertySymbols) {
		var sourceSymbolKeys = Object.getOwnPropertySymbols(source);
		for (i = 0; i < sourceSymbolKeys.length; i++) {
			key = sourceSymbolKeys[i];
			if (excluded.indexOf(key) >= 0) continue;
			if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue;
			target[key] = source[key];
		}
	}
	return target;
}
function _objectWithoutPropertiesLoose$34(source, excluded) {
	if (source == null) return {};
	var target = {};
	var sourceKeys = Object.keys(source);
	var key, i;
	for (i = 0; i < sourceKeys.length; i++) {
		key = sourceKeys[i];
		if (excluded.indexOf(key) >= 0) continue;
		target[key] = source[key];
	}
	return target;
}
var Icon$34 = /* @__PURE__ */ (0, react.memo)(function(_ref) {
	var _ref$size = _ref.size, size = _ref$size === void 0 ? "1em" : _ref$size, style = _ref.style, rest = _objectWithoutProperties$34(_ref, _excluded$34);
	return /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("svg", _objectSpread$34(_objectSpread$34({
		height: size,
		style: _objectSpread$34({
			flex: "none",
			lineHeight: 1
		}, style),
		viewBox: "0 0 24 24",
		width: size,
		xmlns: "http://www.w3.org/2000/svg"
	}, rest), {}, { children: [
		/* @__PURE__ */ (0, react_jsx_runtime.jsx)("title", { children: TITLE$33 }),
		/* @__PURE__ */ (0, react_jsx_runtime.jsx)("path", {
			d: "M21.846 0a1.923 1.923 0 110 3.846H20.15a.226.226 0 01-.227-.226V1.923C19.923.861 20.784 0 21.846 0z",
			fill: "#1783FF"
		}),
		/* @__PURE__ */ (0, react_jsx_runtime.jsx)("path", {
			d: "M11.065 11.199l7.257-7.2c.137-.136.06-.41-.116-.41H14.3a.164.164 0 00-.117.051l-7.82 7.756c-.122.12-.302.013-.302-.179V3.82c0-.127-.083-.23-.185-.23H3.186c-.103 0-.186.103-.186.23V19.77c0 .128.083.23.186.23h2.69c.103 0 .186-.102.186-.23v-3.25c0-.069.025-.135.069-.178l2.424-2.406a.158.158 0 01.205-.023l6.484 4.772a7.677 7.677 0 003.453 1.283c.108.012.2-.095.2-.23v-3.06c0-.117-.07-.212-.164-.227a5.028 5.028 0 01-2.027-.807l-5.613-4.064c-.117-.078-.132-.279-.028-.381z",
			fill: "#fff"
		})
	] }));
});
var Color_default$23 = Icon$34;

//#endregion
//#region node_modules/.pnpm/@lobehub+icons@5.16.0_@types+react@18.3.31_react@18.3.1/node_modules/@lobehub/icons/es/Kimi/components/Mono.js
function _typeof$33(o) {
	"@babel/helpers - typeof";
	return _typeof$33 = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(o$1) {
		return typeof o$1;
	} : function(o$1) {
		return o$1 && "function" == typeof Symbol && o$1.constructor === Symbol && o$1 !== Symbol.prototype ? "symbol" : typeof o$1;
	}, _typeof$33(o);
}
var _excluded$33 = ["size", "style"];
function ownKeys$33(e, r) {
	var t = Object.keys(e);
	if (Object.getOwnPropertySymbols) {
		var o = Object.getOwnPropertySymbols(e);
		r && (o = o.filter(function(r$1) {
			return Object.getOwnPropertyDescriptor(e, r$1).enumerable;
		})), t.push.apply(t, o);
	}
	return t;
}
function _objectSpread$33(e) {
	for (var r = 1; r < arguments.length; r++) {
		var t = null != arguments[r] ? arguments[r] : {};
		r % 2 ? ownKeys$33(Object(t), !0).forEach(function(r$1) {
			_defineProperty$33(e, r$1, t[r$1]);
		}) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys$33(Object(t)).forEach(function(r$1) {
			Object.defineProperty(e, r$1, Object.getOwnPropertyDescriptor(t, r$1));
		});
	}
	return e;
}
function _defineProperty$33(obj, key, value) {
	key = _toPropertyKey$33(key);
	if (key in obj) Object.defineProperty(obj, key, {
		value,
		enumerable: true,
		configurable: true,
		writable: true
	});
	else obj[key] = value;
	return obj;
}
function _toPropertyKey$33(t) {
	var i = _toPrimitive$33(t, "string");
	return "symbol" == _typeof$33(i) ? i : String(i);
}
function _toPrimitive$33(t, r) {
	if ("object" != _typeof$33(t) || !t) return t;
	var e = t[Symbol.toPrimitive];
	if (void 0 !== e) {
		var i = e.call(t, r || "default");
		if ("object" != _typeof$33(i)) return i;
		throw new TypeError("@@toPrimitive must return a primitive value.");
	}
	return ("string" === r ? String : Number)(t);
}
function _objectWithoutProperties$33(source, excluded) {
	if (source == null) return {};
	var target = _objectWithoutPropertiesLoose$33(source, excluded);
	var key, i;
	if (Object.getOwnPropertySymbols) {
		var sourceSymbolKeys = Object.getOwnPropertySymbols(source);
		for (i = 0; i < sourceSymbolKeys.length; i++) {
			key = sourceSymbolKeys[i];
			if (excluded.indexOf(key) >= 0) continue;
			if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue;
			target[key] = source[key];
		}
	}
	return target;
}
function _objectWithoutPropertiesLoose$33(source, excluded) {
	if (source == null) return {};
	var target = {};
	var sourceKeys = Object.keys(source);
	var key, i;
	for (i = 0; i < sourceKeys.length; i++) {
		key = sourceKeys[i];
		if (excluded.indexOf(key) >= 0) continue;
		target[key] = source[key];
	}
	return target;
}
var Icon$33 = /* @__PURE__ */ (0, react.memo)(function(_ref) {
	var _ref$size = _ref.size, size = _ref$size === void 0 ? "1em" : _ref$size, style = _ref.style, rest = _objectWithoutProperties$33(_ref, _excluded$33);
	return /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("svg", _objectSpread$33(_objectSpread$33({
		fill: "currentColor",
		fillRule: "evenodd",
		height: size,
		style: _objectSpread$33({
			flex: "none",
			lineHeight: 1
		}, style),
		viewBox: "0 0 24 24",
		width: size,
		xmlns: "http://www.w3.org/2000/svg"
	}, rest), {}, { children: [
		/* @__PURE__ */ (0, react_jsx_runtime.jsx)("title", { children: TITLE$33 }),
		/* @__PURE__ */ (0, react_jsx_runtime.jsx)("path", { d: "M21.846 0a1.923 1.923 0 110 3.846H20.15a.226.226 0 01-.227-.226V1.923C19.923.861 20.784 0 21.846 0z" }),
		/* @__PURE__ */ (0, react_jsx_runtime.jsx)("path", { d: "M11.065 11.199l7.257-7.2c.137-.136.06-.41-.116-.41H14.3a.164.164 0 00-.117.051l-7.82 7.756c-.122.12-.302.013-.302-.179V3.82c0-.127-.083-.23-.185-.23H3.186c-.103 0-.186.103-.186.23V19.77c0 .128.083.23.186.23h2.69c.103 0 .186-.102.186-.23v-3.25c0-.069.025-.135.069-.178l2.424-2.406a.158.158 0 01.205-.023l6.484 4.772a7.677 7.677 0 003.453 1.283c.108.012.2-.095.2-.23v-3.06c0-.117-.07-.212-.164-.227a5.028 5.028 0 01-2.027-.807l-5.613-4.064c-.117-.078-.132-.279-.028-.381z" })
	] }));
});
var Mono_default$5 = Icon$33;

//#endregion
//#region node_modules/.pnpm/@lobehub+icons@5.16.0_@types+react@18.3.31_react@18.3.1/node_modules/@lobehub/icons/es/LmStudio/style.js
var TITLE$32 = "LM Studio";

//#endregion
//#region node_modules/.pnpm/@lobehub+icons@5.16.0_@types+react@18.3.31_react@18.3.1/node_modules/@lobehub/icons/es/LmStudio/components/Mono.js
function _typeof$32(o) {
	"@babel/helpers - typeof";
	return _typeof$32 = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(o$1) {
		return typeof o$1;
	} : function(o$1) {
		return o$1 && "function" == typeof Symbol && o$1.constructor === Symbol && o$1 !== Symbol.prototype ? "symbol" : typeof o$1;
	}, _typeof$32(o);
}
var _excluded$32 = ["size", "style"];
function ownKeys$32(e, r) {
	var t = Object.keys(e);
	if (Object.getOwnPropertySymbols) {
		var o = Object.getOwnPropertySymbols(e);
		r && (o = o.filter(function(r$1) {
			return Object.getOwnPropertyDescriptor(e, r$1).enumerable;
		})), t.push.apply(t, o);
	}
	return t;
}
function _objectSpread$32(e) {
	for (var r = 1; r < arguments.length; r++) {
		var t = null != arguments[r] ? arguments[r] : {};
		r % 2 ? ownKeys$32(Object(t), !0).forEach(function(r$1) {
			_defineProperty$32(e, r$1, t[r$1]);
		}) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys$32(Object(t)).forEach(function(r$1) {
			Object.defineProperty(e, r$1, Object.getOwnPropertyDescriptor(t, r$1));
		});
	}
	return e;
}
function _defineProperty$32(obj, key, value) {
	key = _toPropertyKey$32(key);
	if (key in obj) Object.defineProperty(obj, key, {
		value,
		enumerable: true,
		configurable: true,
		writable: true
	});
	else obj[key] = value;
	return obj;
}
function _toPropertyKey$32(t) {
	var i = _toPrimitive$32(t, "string");
	return "symbol" == _typeof$32(i) ? i : String(i);
}
function _toPrimitive$32(t, r) {
	if ("object" != _typeof$32(t) || !t) return t;
	var e = t[Symbol.toPrimitive];
	if (void 0 !== e) {
		var i = e.call(t, r || "default");
		if ("object" != _typeof$32(i)) return i;
		throw new TypeError("@@toPrimitive must return a primitive value.");
	}
	return ("string" === r ? String : Number)(t);
}
function _objectWithoutProperties$32(source, excluded) {
	if (source == null) return {};
	var target = _objectWithoutPropertiesLoose$32(source, excluded);
	var key, i;
	if (Object.getOwnPropertySymbols) {
		var sourceSymbolKeys = Object.getOwnPropertySymbols(source);
		for (i = 0; i < sourceSymbolKeys.length; i++) {
			key = sourceSymbolKeys[i];
			if (excluded.indexOf(key) >= 0) continue;
			if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue;
			target[key] = source[key];
		}
	}
	return target;
}
function _objectWithoutPropertiesLoose$32(source, excluded) {
	if (source == null) return {};
	var target = {};
	var sourceKeys = Object.keys(source);
	var key, i;
	for (i = 0; i < sourceKeys.length; i++) {
		key = sourceKeys[i];
		if (excluded.indexOf(key) >= 0) continue;
		target[key] = source[key];
	}
	return target;
}
var Icon$32 = /* @__PURE__ */ (0, react.memo)(function(_ref) {
	var _ref$size = _ref.size, size = _ref$size === void 0 ? "1em" : _ref$size, style = _ref.style, rest = _objectWithoutProperties$32(_ref, _excluded$32);
	return /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("svg", _objectSpread$32(_objectSpread$32({
		fill: "currentColor",
		fillRule: "evenodd",
		height: size,
		style: _objectSpread$32({
			flex: "none",
			lineHeight: 1
		}, style),
		viewBox: "0 0 24 24",
		width: size,
		xmlns: "http://www.w3.org/2000/svg"
	}, rest), {}, { children: [
		/* @__PURE__ */ (0, react_jsx_runtime.jsx)("title", { children: TITLE$32 }),
		/* @__PURE__ */ (0, react_jsx_runtime.jsx)("path", {
			d: "M2.84 2a1.273 1.273 0 100 2.547h14.107a1.273 1.273 0 100-2.547H2.84zM7.935 5.33a1.273 1.273 0 000 2.548H22.04a1.274 1.274 0 000-2.547H7.935zM3.624 9.935c0-.704.57-1.274 1.274-1.274h14.106a1.274 1.274 0 010 2.547H4.898c-.703 0-1.274-.57-1.274-1.273zM1.273 12.188a1.273 1.273 0 100 2.547H15.38a1.274 1.274 0 000-2.547H1.273zM3.624 16.792c0-.704.57-1.274 1.274-1.274h14.106a1.273 1.273 0 110 2.547H4.898c-.703 0-1.274-.57-1.274-1.273zM13.029 18.849a1.273 1.273 0 100 2.547h9.698a1.273 1.273 0 100-2.547h-9.698z",
			fillOpacity: ".3"
		}),
		/* @__PURE__ */ (0, react_jsx_runtime.jsx)("path", { d: "M2.84 2a1.273 1.273 0 100 2.547h10.287a1.274 1.274 0 000-2.547H2.84zM7.935 5.33a1.273 1.273 0 000 2.548H18.22a1.274 1.274 0 000-2.547H7.935zM3.624 9.935c0-.704.57-1.274 1.274-1.274h10.286a1.273 1.273 0 010 2.547H4.898c-.703 0-1.274-.57-1.274-1.273zM1.273 12.188a1.273 1.273 0 100 2.547H11.56a1.274 1.274 0 000-2.547H1.273zM3.624 16.792c0-.704.57-1.274 1.274-1.274h10.286a1.273 1.273 0 110 2.547H4.898c-.703 0-1.274-.57-1.274-1.273zM13.029 18.849a1.273 1.273 0 100 2.547h5.78a1.273 1.273 0 100-2.547h-5.78z" })
	] }));
});
var Mono_default$6 = Icon$32;

//#endregion
//#region node_modules/.pnpm/@lobehub+icons@5.16.0_@types+react@18.3.31_react@18.3.1/node_modules/@lobehub/icons/es/LongCat/style.js
var TITLE$31 = "LongCat";

//#endregion
//#region node_modules/.pnpm/@lobehub+icons@5.16.0_@types+react@18.3.31_react@18.3.1/node_modules/@lobehub/icons/es/LongCat/components/Color.js
function _typeof$31(o) {
	"@babel/helpers - typeof";
	return _typeof$31 = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(o$1) {
		return typeof o$1;
	} : function(o$1) {
		return o$1 && "function" == typeof Symbol && o$1.constructor === Symbol && o$1 !== Symbol.prototype ? "symbol" : typeof o$1;
	}, _typeof$31(o);
}
var _excluded$31 = ["size", "style"];
function ownKeys$31(e, r) {
	var t = Object.keys(e);
	if (Object.getOwnPropertySymbols) {
		var o = Object.getOwnPropertySymbols(e);
		r && (o = o.filter(function(r$1) {
			return Object.getOwnPropertyDescriptor(e, r$1).enumerable;
		})), t.push.apply(t, o);
	}
	return t;
}
function _objectSpread$31(e) {
	for (var r = 1; r < arguments.length; r++) {
		var t = null != arguments[r] ? arguments[r] : {};
		r % 2 ? ownKeys$31(Object(t), !0).forEach(function(r$1) {
			_defineProperty$31(e, r$1, t[r$1]);
		}) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys$31(Object(t)).forEach(function(r$1) {
			Object.defineProperty(e, r$1, Object.getOwnPropertyDescriptor(t, r$1));
		});
	}
	return e;
}
function _defineProperty$31(obj, key, value) {
	key = _toPropertyKey$31(key);
	if (key in obj) Object.defineProperty(obj, key, {
		value,
		enumerable: true,
		configurable: true,
		writable: true
	});
	else obj[key] = value;
	return obj;
}
function _toPropertyKey$31(t) {
	var i = _toPrimitive$31(t, "string");
	return "symbol" == _typeof$31(i) ? i : String(i);
}
function _toPrimitive$31(t, r) {
	if ("object" != _typeof$31(t) || !t) return t;
	var e = t[Symbol.toPrimitive];
	if (void 0 !== e) {
		var i = e.call(t, r || "default");
		if ("object" != _typeof$31(i)) return i;
		throw new TypeError("@@toPrimitive must return a primitive value.");
	}
	return ("string" === r ? String : Number)(t);
}
function _objectWithoutProperties$31(source, excluded) {
	if (source == null) return {};
	var target = _objectWithoutPropertiesLoose$31(source, excluded);
	var key, i;
	if (Object.getOwnPropertySymbols) {
		var sourceSymbolKeys = Object.getOwnPropertySymbols(source);
		for (i = 0; i < sourceSymbolKeys.length; i++) {
			key = sourceSymbolKeys[i];
			if (excluded.indexOf(key) >= 0) continue;
			if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue;
			target[key] = source[key];
		}
	}
	return target;
}
function _objectWithoutPropertiesLoose$31(source, excluded) {
	if (source == null) return {};
	var target = {};
	var sourceKeys = Object.keys(source);
	var key, i;
	for (i = 0; i < sourceKeys.length; i++) {
		key = sourceKeys[i];
		if (excluded.indexOf(key) >= 0) continue;
		target[key] = source[key];
	}
	return target;
}
var Icon$31 = /* @__PURE__ */ (0, react.memo)(function(_ref) {
	var _ref$size = _ref.size, size = _ref$size === void 0 ? "1em" : _ref$size, style = _ref.style, rest = _objectWithoutProperties$31(_ref, _excluded$31);
	return /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("svg", _objectSpread$31(_objectSpread$31({
		fill: "currentColor",
		height: size,
		style: _objectSpread$31({
			flex: "none",
			lineHeight: 1
		}, style),
		viewBox: "0 0 24 24",
		width: size,
		xmlns: "http://www.w3.org/2000/svg"
	}, rest), {}, { children: [
		/* @__PURE__ */ (0, react_jsx_runtime.jsx)("title", { children: TITLE$31 }),
		/* @__PURE__ */ (0, react_jsx_runtime.jsx)("path", {
			clipRule: "evenodd",
			d: "M.507 19.883a.507.507 0 01-.489-.642L4.29 3.745a1.013 1.013 0 011.533-.578l5.622 3.687a1.013 1.013 0 001.11 0L18.2 3.165a1.013 1.013 0 011.532.58l4.25 15.497a.506.506 0 01-.49.64H18.07a6.297 6.297 0 001.53-4.115v-.177a6.09 6.09 0 00-1.513-4.017l-.697-3.495a.438.438 0 00-.694-.266L14.07 9.781a.748.748 0 01-.654.121 5.156 5.156 0 00-2.833 0 .746.746 0 01-.653-.121L7.302 7.81a.435.435 0 00-.688.269l-.675 3.652a5.36 5.36 0 00-1.539 3.76v.333c0 1.474.527 2.9 1.488 4.02l.032.038H.507z",
			fill: "#29E154",
			fillRule: "evenodd"
		}),
		/* @__PURE__ */ (0, react_jsx_runtime.jsx)("path", { d: "M9.213 16.843h1.52v-3.546h-1.29l-.23 3.546zm5.573 0h-1.52v-3.546h1.29l.23 3.546z" })
	] }));
});
var Color_default$24 = Icon$31;

//#endregion
//#region node_modules/.pnpm/@lobehub+icons@5.16.0_@types+react@18.3.31_react@18.3.1/node_modules/@lobehub/icons/es/Minimax/style.js
var TITLE$30 = "Minimax";

//#endregion
//#region node_modules/.pnpm/@lobehub+icons@5.16.0_@types+react@18.3.31_react@18.3.1/node_modules/@lobehub/icons/es/Minimax/components/Color.js
function _typeof$30(o) {
	"@babel/helpers - typeof";
	return _typeof$30 = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(o$1) {
		return typeof o$1;
	} : function(o$1) {
		return o$1 && "function" == typeof Symbol && o$1.constructor === Symbol && o$1 !== Symbol.prototype ? "symbol" : typeof o$1;
	}, _typeof$30(o);
}
var _excluded$30 = ["size", "style"];
function ownKeys$30(e, r) {
	var t = Object.keys(e);
	if (Object.getOwnPropertySymbols) {
		var o = Object.getOwnPropertySymbols(e);
		r && (o = o.filter(function(r$1) {
			return Object.getOwnPropertyDescriptor(e, r$1).enumerable;
		})), t.push.apply(t, o);
	}
	return t;
}
function _objectSpread$30(e) {
	for (var r = 1; r < arguments.length; r++) {
		var t = null != arguments[r] ? arguments[r] : {};
		r % 2 ? ownKeys$30(Object(t), !0).forEach(function(r$1) {
			_defineProperty$30(e, r$1, t[r$1]);
		}) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys$30(Object(t)).forEach(function(r$1) {
			Object.defineProperty(e, r$1, Object.getOwnPropertyDescriptor(t, r$1));
		});
	}
	return e;
}
function _defineProperty$30(obj, key, value) {
	key = _toPropertyKey$30(key);
	if (key in obj) Object.defineProperty(obj, key, {
		value,
		enumerable: true,
		configurable: true,
		writable: true
	});
	else obj[key] = value;
	return obj;
}
function _toPropertyKey$30(t) {
	var i = _toPrimitive$30(t, "string");
	return "symbol" == _typeof$30(i) ? i : String(i);
}
function _toPrimitive$30(t, r) {
	if ("object" != _typeof$30(t) || !t) return t;
	var e = t[Symbol.toPrimitive];
	if (void 0 !== e) {
		var i = e.call(t, r || "default");
		if ("object" != _typeof$30(i)) return i;
		throw new TypeError("@@toPrimitive must return a primitive value.");
	}
	return ("string" === r ? String : Number)(t);
}
function _objectWithoutProperties$30(source, excluded) {
	if (source == null) return {};
	var target = _objectWithoutPropertiesLoose$30(source, excluded);
	var key, i;
	if (Object.getOwnPropertySymbols) {
		var sourceSymbolKeys = Object.getOwnPropertySymbols(source);
		for (i = 0; i < sourceSymbolKeys.length; i++) {
			key = sourceSymbolKeys[i];
			if (excluded.indexOf(key) >= 0) continue;
			if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue;
			target[key] = source[key];
		}
	}
	return target;
}
function _objectWithoutPropertiesLoose$30(source, excluded) {
	if (source == null) return {};
	var target = {};
	var sourceKeys = Object.keys(source);
	var key, i;
	for (i = 0; i < sourceKeys.length; i++) {
		key = sourceKeys[i];
		if (excluded.indexOf(key) >= 0) continue;
		target[key] = source[key];
	}
	return target;
}
var Icon$30 = /* @__PURE__ */ (0, react.memo)(function(_ref) {
	var _ref$size = _ref.size, size = _ref$size === void 0 ? "1em" : _ref$size, style = _ref.style, rest = _objectWithoutProperties$30(_ref, _excluded$30);
	var _useFillId = useFillId(TITLE$30), id = _useFillId.id, fill = _useFillId.fill;
	return /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("svg", _objectSpread$30(_objectSpread$30({
		height: size,
		style: _objectSpread$30({
			flex: "none",
			lineHeight: 1
		}, style),
		viewBox: "0 0 24 24",
		width: size,
		xmlns: "http://www.w3.org/2000/svg"
	}, rest), {}, { children: [
		/* @__PURE__ */ (0, react_jsx_runtime.jsx)("title", { children: TITLE$30 }),
		/* @__PURE__ */ (0, react_jsx_runtime.jsx)("defs", { children: /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("linearGradient", {
			id,
			x1: "0%",
			x2: "100.182%",
			y1: "50.057%",
			y2: "50.057%",
			children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)("stop", {
				offset: "0%",
				stopColor: "#E2167E"
			}), /* @__PURE__ */ (0, react_jsx_runtime.jsx)("stop", {
				offset: "100%",
				stopColor: "#FE603C"
			})]
		}) }),
		/* @__PURE__ */ (0, react_jsx_runtime.jsx)("path", {
			d: "M16.278 2c1.156 0 2.093.927 2.093 2.07v12.501a.74.74 0 00.744.709.74.74 0 00.743-.709V9.099a2.06 2.06 0 012.071-2.049A2.06 2.06 0 0124 9.1v6.561a.649.649 0 01-.652.645.649.649 0 01-.653-.645V9.1a.762.762 0 00-.766-.758.762.762 0 00-.766.758v7.472a2.037 2.037 0 01-2.048 2.026 2.037 2.037 0 01-2.048-2.026v-12.5a.785.785 0 00-.788-.753.785.785 0 00-.789.752l-.001 15.904A2.037 2.037 0 0113.441 22a2.037 2.037 0 01-2.048-2.026V18.04c0-.356.292-.645.652-.645.36 0 .652.289.652.645v1.934c0 .263.142.506.372.638.23.131.514.131.744 0a.734.734 0 00.372-.638V4.07c0-1.143.937-2.07 2.093-2.07zm-5.674 0c1.156 0 2.093.927 2.093 2.07v11.523a.648.648 0 01-.652.645.648.648 0 01-.652-.645V4.07a.785.785 0 00-.789-.78.785.785 0 00-.789.78v14.013a2.06 2.06 0 01-2.07 2.048 2.06 2.06 0 01-2.071-2.048V9.1a.762.762 0 00-.766-.758.762.762 0 00-.766.758v3.8a2.06 2.06 0 01-2.071 2.049A2.06 2.06 0 010 12.9v-1.378c0-.357.292-.646.652-.646.36 0 .653.29.653.646V12.9c0 .418.343.757.766.757s.766-.339.766-.757V9.099a2.06 2.06 0 012.07-2.048 2.06 2.06 0 012.071 2.048v8.984c0 .419.343.758.767.758.423 0 .766-.339.766-.758V4.07c0-1.143.937-2.07 2.093-2.07z",
			fill,
			fillRule: "nonzero"
		})
	] }));
});
var Color_default$25 = Icon$30;

//#endregion
//#region node_modules/.pnpm/@lobehub+icons@5.16.0_@types+react@18.3.31_react@18.3.1/node_modules/@lobehub/icons/es/Mistral/style.js
var TITLE$29 = "Mistral";

//#endregion
//#region node_modules/.pnpm/@lobehub+icons@5.16.0_@types+react@18.3.31_react@18.3.1/node_modules/@lobehub/icons/es/Mistral/components/Color.js
function _typeof$29(o) {
	"@babel/helpers - typeof";
	return _typeof$29 = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(o$1) {
		return typeof o$1;
	} : function(o$1) {
		return o$1 && "function" == typeof Symbol && o$1.constructor === Symbol && o$1 !== Symbol.prototype ? "symbol" : typeof o$1;
	}, _typeof$29(o);
}
var _excluded$29 = ["size", "style"];
function ownKeys$29(e, r) {
	var t = Object.keys(e);
	if (Object.getOwnPropertySymbols) {
		var o = Object.getOwnPropertySymbols(e);
		r && (o = o.filter(function(r$1) {
			return Object.getOwnPropertyDescriptor(e, r$1).enumerable;
		})), t.push.apply(t, o);
	}
	return t;
}
function _objectSpread$29(e) {
	for (var r = 1; r < arguments.length; r++) {
		var t = null != arguments[r] ? arguments[r] : {};
		r % 2 ? ownKeys$29(Object(t), !0).forEach(function(r$1) {
			_defineProperty$29(e, r$1, t[r$1]);
		}) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys$29(Object(t)).forEach(function(r$1) {
			Object.defineProperty(e, r$1, Object.getOwnPropertyDescriptor(t, r$1));
		});
	}
	return e;
}
function _defineProperty$29(obj, key, value) {
	key = _toPropertyKey$29(key);
	if (key in obj) Object.defineProperty(obj, key, {
		value,
		enumerable: true,
		configurable: true,
		writable: true
	});
	else obj[key] = value;
	return obj;
}
function _toPropertyKey$29(t) {
	var i = _toPrimitive$29(t, "string");
	return "symbol" == _typeof$29(i) ? i : String(i);
}
function _toPrimitive$29(t, r) {
	if ("object" != _typeof$29(t) || !t) return t;
	var e = t[Symbol.toPrimitive];
	if (void 0 !== e) {
		var i = e.call(t, r || "default");
		if ("object" != _typeof$29(i)) return i;
		throw new TypeError("@@toPrimitive must return a primitive value.");
	}
	return ("string" === r ? String : Number)(t);
}
function _objectWithoutProperties$29(source, excluded) {
	if (source == null) return {};
	var target = _objectWithoutPropertiesLoose$29(source, excluded);
	var key, i;
	if (Object.getOwnPropertySymbols) {
		var sourceSymbolKeys = Object.getOwnPropertySymbols(source);
		for (i = 0; i < sourceSymbolKeys.length; i++) {
			key = sourceSymbolKeys[i];
			if (excluded.indexOf(key) >= 0) continue;
			if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue;
			target[key] = source[key];
		}
	}
	return target;
}
function _objectWithoutPropertiesLoose$29(source, excluded) {
	if (source == null) return {};
	var target = {};
	var sourceKeys = Object.keys(source);
	var key, i;
	for (i = 0; i < sourceKeys.length; i++) {
		key = sourceKeys[i];
		if (excluded.indexOf(key) >= 0) continue;
		target[key] = source[key];
	}
	return target;
}
var Icon$29 = /* @__PURE__ */ (0, react.memo)(function(_ref) {
	var _ref$size = _ref.size, size = _ref$size === void 0 ? "1em" : _ref$size, style = _ref.style, rest = _objectWithoutProperties$29(_ref, _excluded$29);
	return /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("svg", _objectSpread$29(_objectSpread$29({
		height: size,
		style: _objectSpread$29({
			flex: "none",
			lineHeight: 1
		}, style),
		viewBox: "0 0 24 24",
		width: size,
		xmlns: "http://www.w3.org/2000/svg"
	}, rest), {}, { children: [
		/* @__PURE__ */ (0, react_jsx_runtime.jsx)("title", { children: TITLE$29 }),
		/* @__PURE__ */ (0, react_jsx_runtime.jsx)("path", {
			d: "M3.428 3.4h3.429v3.428H3.428V3.4zm13.714 0h3.43v3.428h-3.43V3.4z",
			fill: "gold"
		}),
		/* @__PURE__ */ (0, react_jsx_runtime.jsx)("path", {
			d: "M3.428 6.828h6.857v3.429H3.429V6.828zm10.286 0h6.857v3.429h-6.857V6.828z",
			fill: "#FFAF00"
		}),
		/* @__PURE__ */ (0, react_jsx_runtime.jsx)("path", {
			d: "M3.428 10.258h17.144v3.428H3.428v-3.428z",
			fill: "#FF8205"
		}),
		/* @__PURE__ */ (0, react_jsx_runtime.jsx)("path", {
			d: "M3.428 13.686h3.429v3.428H3.428v-3.428zm6.858 0h3.429v3.428h-3.429v-3.428zm6.856 0h3.43v3.428h-3.43v-3.428z",
			fill: "#FA500F"
		}),
		/* @__PURE__ */ (0, react_jsx_runtime.jsx)("path", {
			d: "M0 17.114h10.286v3.429H0v-3.429zm13.714 0H24v3.429H13.714v-3.429z",
			fill: "#E10500"
		})
	] }));
});
var Color_default$26 = Icon$29;

//#endregion
//#region node_modules/.pnpm/@lobehub+icons@5.16.0_@types+react@18.3.31_react@18.3.1/node_modules/@lobehub/icons/es/ModelScope/style.js
var TITLE$28 = "ModelScope";

//#endregion
//#region node_modules/.pnpm/@lobehub+icons@5.16.0_@types+react@18.3.31_react@18.3.1/node_modules/@lobehub/icons/es/ModelScope/components/Color.js
function _typeof$28(o) {
	"@babel/helpers - typeof";
	return _typeof$28 = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(o$1) {
		return typeof o$1;
	} : function(o$1) {
		return o$1 && "function" == typeof Symbol && o$1.constructor === Symbol && o$1 !== Symbol.prototype ? "symbol" : typeof o$1;
	}, _typeof$28(o);
}
var _excluded$28 = ["size", "style"];
function ownKeys$28(e, r) {
	var t = Object.keys(e);
	if (Object.getOwnPropertySymbols) {
		var o = Object.getOwnPropertySymbols(e);
		r && (o = o.filter(function(r$1) {
			return Object.getOwnPropertyDescriptor(e, r$1).enumerable;
		})), t.push.apply(t, o);
	}
	return t;
}
function _objectSpread$28(e) {
	for (var r = 1; r < arguments.length; r++) {
		var t = null != arguments[r] ? arguments[r] : {};
		r % 2 ? ownKeys$28(Object(t), !0).forEach(function(r$1) {
			_defineProperty$28(e, r$1, t[r$1]);
		}) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys$28(Object(t)).forEach(function(r$1) {
			Object.defineProperty(e, r$1, Object.getOwnPropertyDescriptor(t, r$1));
		});
	}
	return e;
}
function _defineProperty$28(obj, key, value) {
	key = _toPropertyKey$28(key);
	if (key in obj) Object.defineProperty(obj, key, {
		value,
		enumerable: true,
		configurable: true,
		writable: true
	});
	else obj[key] = value;
	return obj;
}
function _toPropertyKey$28(t) {
	var i = _toPrimitive$28(t, "string");
	return "symbol" == _typeof$28(i) ? i : String(i);
}
function _toPrimitive$28(t, r) {
	if ("object" != _typeof$28(t) || !t) return t;
	var e = t[Symbol.toPrimitive];
	if (void 0 !== e) {
		var i = e.call(t, r || "default");
		if ("object" != _typeof$28(i)) return i;
		throw new TypeError("@@toPrimitive must return a primitive value.");
	}
	return ("string" === r ? String : Number)(t);
}
function _objectWithoutProperties$28(source, excluded) {
	if (source == null) return {};
	var target = _objectWithoutPropertiesLoose$28(source, excluded);
	var key, i;
	if (Object.getOwnPropertySymbols) {
		var sourceSymbolKeys = Object.getOwnPropertySymbols(source);
		for (i = 0; i < sourceSymbolKeys.length; i++) {
			key = sourceSymbolKeys[i];
			if (excluded.indexOf(key) >= 0) continue;
			if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue;
			target[key] = source[key];
		}
	}
	return target;
}
function _objectWithoutPropertiesLoose$28(source, excluded) {
	if (source == null) return {};
	var target = {};
	var sourceKeys = Object.keys(source);
	var key, i;
	for (i = 0; i < sourceKeys.length; i++) {
		key = sourceKeys[i];
		if (excluded.indexOf(key) >= 0) continue;
		target[key] = source[key];
	}
	return target;
}
var Icon$28 = /* @__PURE__ */ (0, react.memo)(function(_ref) {
	var _ref$size = _ref.size, size = _ref$size === void 0 ? "1em" : _ref$size, style = _ref.style, rest = _objectWithoutProperties$28(_ref, _excluded$28);
	return /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("svg", _objectSpread$28(_objectSpread$28({
		height: size,
		style: _objectSpread$28({
			flex: "none",
			lineHeight: 1
		}, style),
		viewBox: "0 0 24 24",
		width: size,
		xmlns: "http://www.w3.org/2000/svg"
	}, rest), {}, { children: [
		/* @__PURE__ */ (0, react_jsx_runtime.jsx)("title", { children: TITLE$28 }),
		/* @__PURE__ */ (0, react_jsx_runtime.jsx)("path", {
			d: "M0 7.967h2.667v2.667H0zM8 10.633h2.667V13.3H8z",
			fill: "#36CED0"
		}),
		/* @__PURE__ */ (0, react_jsx_runtime.jsx)("path", {
			d: "M0 10.633h2.667V13.3H0zM2.667 13.3h2.666v2.667H8v2.666H2.667V13.3zM2.667 5.3H8v2.667H5.333v2.666H2.667V5.3zM10.667 13.3h2.667v2.667h-2.667z",
			fill: "#624AFF"
		}),
		/* @__PURE__ */ (0, react_jsx_runtime.jsx)("path", {
			d: "M24 7.967h-2.667v2.667H24zM16 10.633h-2.667V13.3H16z",
			fill: "#36CED0"
		}),
		/* @__PURE__ */ (0, react_jsx_runtime.jsx)("path", {
			d: "M24 10.633h-2.667V13.3H24zM21.333 13.3h-2.666v2.667H16v2.666h5.333V13.3zM21.333 5.3H16v2.667h2.667v2.666h2.666V5.3z",
			fill: "#624AFF"
		})
	] }));
});
var Color_default$27 = Icon$28;

//#endregion
//#region node_modules/.pnpm/@lobehub+icons@5.16.0_@types+react@18.3.31_react@18.3.1/node_modules/@lobehub/icons/es/Moonshot/style.js
var TITLE$27 = "MoonshotAI";

//#endregion
//#region node_modules/.pnpm/@lobehub+icons@5.16.0_@types+react@18.3.31_react@18.3.1/node_modules/@lobehub/icons/es/Moonshot/components/Mono.js
function _typeof$27(o) {
	"@babel/helpers - typeof";
	return _typeof$27 = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(o$1) {
		return typeof o$1;
	} : function(o$1) {
		return o$1 && "function" == typeof Symbol && o$1.constructor === Symbol && o$1 !== Symbol.prototype ? "symbol" : typeof o$1;
	}, _typeof$27(o);
}
var _excluded$27 = ["size", "style"];
function ownKeys$27(e, r) {
	var t = Object.keys(e);
	if (Object.getOwnPropertySymbols) {
		var o = Object.getOwnPropertySymbols(e);
		r && (o = o.filter(function(r$1) {
			return Object.getOwnPropertyDescriptor(e, r$1).enumerable;
		})), t.push.apply(t, o);
	}
	return t;
}
function _objectSpread$27(e) {
	for (var r = 1; r < arguments.length; r++) {
		var t = null != arguments[r] ? arguments[r] : {};
		r % 2 ? ownKeys$27(Object(t), !0).forEach(function(r$1) {
			_defineProperty$27(e, r$1, t[r$1]);
		}) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys$27(Object(t)).forEach(function(r$1) {
			Object.defineProperty(e, r$1, Object.getOwnPropertyDescriptor(t, r$1));
		});
	}
	return e;
}
function _defineProperty$27(obj, key, value) {
	key = _toPropertyKey$27(key);
	if (key in obj) Object.defineProperty(obj, key, {
		value,
		enumerable: true,
		configurable: true,
		writable: true
	});
	else obj[key] = value;
	return obj;
}
function _toPropertyKey$27(t) {
	var i = _toPrimitive$27(t, "string");
	return "symbol" == _typeof$27(i) ? i : String(i);
}
function _toPrimitive$27(t, r) {
	if ("object" != _typeof$27(t) || !t) return t;
	var e = t[Symbol.toPrimitive];
	if (void 0 !== e) {
		var i = e.call(t, r || "default");
		if ("object" != _typeof$27(i)) return i;
		throw new TypeError("@@toPrimitive must return a primitive value.");
	}
	return ("string" === r ? String : Number)(t);
}
function _objectWithoutProperties$27(source, excluded) {
	if (source == null) return {};
	var target = _objectWithoutPropertiesLoose$27(source, excluded);
	var key, i;
	if (Object.getOwnPropertySymbols) {
		var sourceSymbolKeys = Object.getOwnPropertySymbols(source);
		for (i = 0; i < sourceSymbolKeys.length; i++) {
			key = sourceSymbolKeys[i];
			if (excluded.indexOf(key) >= 0) continue;
			if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue;
			target[key] = source[key];
		}
	}
	return target;
}
function _objectWithoutPropertiesLoose$27(source, excluded) {
	if (source == null) return {};
	var target = {};
	var sourceKeys = Object.keys(source);
	var key, i;
	for (i = 0; i < sourceKeys.length; i++) {
		key = sourceKeys[i];
		if (excluded.indexOf(key) >= 0) continue;
		target[key] = source[key];
	}
	return target;
}
var Icon$27 = /* @__PURE__ */ (0, react.memo)(function(_ref) {
	var _ref$size = _ref.size, size = _ref$size === void 0 ? "1em" : _ref$size, style = _ref.style, rest = _objectWithoutProperties$27(_ref, _excluded$27);
	return /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("svg", _objectSpread$27(_objectSpread$27({
		fill: "currentColor",
		fillRule: "evenodd",
		height: size,
		style: _objectSpread$27({
			flex: "none",
			lineHeight: 1
		}, style),
		viewBox: "0 0 24 24",
		width: size,
		xmlns: "http://www.w3.org/2000/svg"
	}, rest), {}, { children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)("title", { children: TITLE$27 }), /* @__PURE__ */ (0, react_jsx_runtime.jsx)("path", { d: "M1.052 16.916l9.539 2.552a21.007 21.007 0 00.06 2.033l5.956 1.593a11.997 11.997 0 01-5.586.865l-.18-.016-.044-.004-.084-.009-.094-.01a11.605 11.605 0 01-.157-.02l-.107-.014-.11-.016a11.962 11.962 0 01-.32-.051l-.042-.008-.075-.013-.107-.02-.07-.015-.093-.019-.075-.016-.095-.02-.097-.023-.094-.022-.068-.017-.088-.022-.09-.024-.095-.025-.082-.023-.109-.03-.062-.02-.084-.025-.093-.028-.105-.034-.058-.019-.08-.026-.09-.031-.066-.024a6.293 6.293 0 01-.044-.015l-.068-.025-.101-.037-.057-.022-.08-.03-.087-.035-.088-.035-.079-.032-.095-.04-.063-.028-.063-.027a5.655 5.655 0 01-.041-.018l-.066-.03-.103-.047-.052-.024-.096-.046-.062-.03-.084-.04-.086-.044-.093-.047-.052-.027-.103-.055-.057-.03-.058-.032a6.49 6.49 0 01-.046-.026l-.094-.053-.06-.034-.051-.03-.072-.041-.082-.05-.093-.056-.052-.032-.084-.053-.061-.039-.079-.05-.07-.047-.053-.035a7.785 7.785 0 01-.054-.036l-.044-.03-.044-.03a6.066 6.066 0 01-.04-.028l-.057-.04-.076-.054-.069-.05-.074-.054-.056-.042-.076-.057-.076-.059-.086-.067-.045-.035-.064-.052-.074-.06-.089-.073-.046-.039-.046-.039a7.516 7.516 0 01-.043-.037l-.045-.04-.061-.053-.07-.062-.068-.06-.062-.058-.067-.062-.053-.05-.088-.084a13.28 13.28 0 01-.099-.097l-.029-.028-.041-.042-.069-.07-.05-.051-.05-.053a6.457 6.457 0 01-.168-.179l-.08-.088-.062-.07-.071-.08-.042-.049-.053-.062-.058-.068-.046-.056a7.175 7.175 0 01-.027-.033l-.045-.055-.066-.082-.041-.052-.05-.064-.02-.025a11.99 11.99 0 01-1.44-2.402zm-1.02-5.794l11.353 3.037a20.468 20.468 0 00-.469 2.011l10.817 2.894a12.076 12.076 0 01-1.845 2.005L.657 15.923l-.016-.046-.035-.104a11.965 11.965 0 01-.05-.153l-.007-.023a11.896 11.896 0 01-.207-.741l-.03-.126-.018-.08-.021-.097-.018-.081-.018-.09-.017-.084-.018-.094c-.026-.141-.05-.283-.071-.426l-.017-.118-.011-.083-.013-.102a12.01 12.01 0 01-.019-.161l-.005-.047a12.12 12.12 0 01-.034-2.145zm1.593-5.15l11.948 3.196c-.368.605-.705 1.231-1.01 1.875l11.295 3.022c-.142.82-.368 1.612-.668 2.365l-11.55-3.09L.124 10.26l.015-.1.008-.049.01-.067.015-.087.018-.098c.026-.148.056-.295.088-.442l.028-.124.02-.085.024-.097c.022-.09.045-.18.07-.268l.028-.102.023-.083.03-.1.025-.082.03-.096.026-.082.031-.095a11.896 11.896 0 011.01-2.232zm4.442-4.4L17.352 4.59a20.77 20.77 0 00-1.688 1.721l7.823 2.093c.267.852.442 1.744.513 2.665L2.106 5.213l.045-.065.027-.04.04-.055.046-.065.055-.076.054-.072.064-.086.05-.065.057-.073.055-.07.06-.074.055-.069.065-.077.054-.066.066-.077.053-.06.072-.082.053-.06.067-.074.054-.058.073-.078.058-.06.063-.067.168-.17.1-.098.059-.056.076-.071a12.084 12.084 0 012.272-1.677zM12.017 0h.097l.082.001.069.001.054.002.068.002.046.001.076.003.047.002.06.003.054.002.087.005.105.007.144.011.088.007.044.004.077.008.082.008.047.005.102.012.05.006.108.014.081.01.042.006.065.01.207.032.07.012.065.011.14.026.092.018.11.022.046.01.075.016.041.01L14.7.3l.042.01.065.015.049.012.071.017.096.024.112.03.113.03.113.032.05.015.07.02.078.024.073.023.05.016.05.016.076.025.099.033.102.036.048.017.064.023.093.034.11.041.116.045.1.04.047.02.06.024.041.018.063.026.04.018.057.025.11.048.1.046.074.035.075.036.06.028.092.046.091.045.102.052.053.028.049.026.046.024.06.033.041.022.052.029.088.05.106.06.087.051.057.034.053.032.096.059.088.055.098.062.036.024.064.041.084.056.04.027.062.042.062.043.023.017c.054.037.108.075.161.114l.083.06.065.048.056.043.086.065.082.064.04.03.05.041.086.069.079.065.085.071c.712.6 1.353 1.283 1.909 2.031L7.222.994l.062-.027.065-.028.081-.034.086-.035c.113-.045.227-.09.341-.131l.096-.035.093-.033.084-.03.096-.031c.087-.03.176-.058.264-.085l.091-.027.086-.025.102-.03.085-.023.1-.026L9.04.37l.09-.023.091-.022.095-.022.09-.02.098-.021.091-.02.095-.018.092-.018.1-.018.091-.016.098-.017.092-.014.097-.015.092-.013.102-.013.091-.012.105-.012.09-.01.105-.01c.093-.01.186-.018.28-.024l.106-.008.09-.005.11-.006.093-.004.1-.004.097-.002.099-.002.197-.002z" })] }));
});
var Mono_default$7 = Icon$27;

//#endregion
//#region node_modules/.pnpm/@lobehub+icons@5.16.0_@types+react@18.3.31_react@18.3.1/node_modules/@lobehub/icons/es/Nebius/style.js
var TITLE$26 = "Nebius";

//#endregion
//#region node_modules/.pnpm/@lobehub+icons@5.16.0_@types+react@18.3.31_react@18.3.1/node_modules/@lobehub/icons/es/Nebius/components/Mono.js
function _typeof$26(o) {
	"@babel/helpers - typeof";
	return _typeof$26 = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(o$1) {
		return typeof o$1;
	} : function(o$1) {
		return o$1 && "function" == typeof Symbol && o$1.constructor === Symbol && o$1 !== Symbol.prototype ? "symbol" : typeof o$1;
	}, _typeof$26(o);
}
var _excluded$26 = ["size", "style"];
function ownKeys$26(e, r) {
	var t = Object.keys(e);
	if (Object.getOwnPropertySymbols) {
		var o = Object.getOwnPropertySymbols(e);
		r && (o = o.filter(function(r$1) {
			return Object.getOwnPropertyDescriptor(e, r$1).enumerable;
		})), t.push.apply(t, o);
	}
	return t;
}
function _objectSpread$26(e) {
	for (var r = 1; r < arguments.length; r++) {
		var t = null != arguments[r] ? arguments[r] : {};
		r % 2 ? ownKeys$26(Object(t), !0).forEach(function(r$1) {
			_defineProperty$26(e, r$1, t[r$1]);
		}) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys$26(Object(t)).forEach(function(r$1) {
			Object.defineProperty(e, r$1, Object.getOwnPropertyDescriptor(t, r$1));
		});
	}
	return e;
}
function _defineProperty$26(obj, key, value) {
	key = _toPropertyKey$26(key);
	if (key in obj) Object.defineProperty(obj, key, {
		value,
		enumerable: true,
		configurable: true,
		writable: true
	});
	else obj[key] = value;
	return obj;
}
function _toPropertyKey$26(t) {
	var i = _toPrimitive$26(t, "string");
	return "symbol" == _typeof$26(i) ? i : String(i);
}
function _toPrimitive$26(t, r) {
	if ("object" != _typeof$26(t) || !t) return t;
	var e = t[Symbol.toPrimitive];
	if (void 0 !== e) {
		var i = e.call(t, r || "default");
		if ("object" != _typeof$26(i)) return i;
		throw new TypeError("@@toPrimitive must return a primitive value.");
	}
	return ("string" === r ? String : Number)(t);
}
function _objectWithoutProperties$26(source, excluded) {
	if (source == null) return {};
	var target = _objectWithoutPropertiesLoose$26(source, excluded);
	var key, i;
	if (Object.getOwnPropertySymbols) {
		var sourceSymbolKeys = Object.getOwnPropertySymbols(source);
		for (i = 0; i < sourceSymbolKeys.length; i++) {
			key = sourceSymbolKeys[i];
			if (excluded.indexOf(key) >= 0) continue;
			if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue;
			target[key] = source[key];
		}
	}
	return target;
}
function _objectWithoutPropertiesLoose$26(source, excluded) {
	if (source == null) return {};
	var target = {};
	var sourceKeys = Object.keys(source);
	var key, i;
	for (i = 0; i < sourceKeys.length; i++) {
		key = sourceKeys[i];
		if (excluded.indexOf(key) >= 0) continue;
		target[key] = source[key];
	}
	return target;
}
var Icon$26 = /* @__PURE__ */ (0, react.memo)(function(_ref) {
	var _ref$size = _ref.size, size = _ref$size === void 0 ? "1em" : _ref$size, style = _ref.style, rest = _objectWithoutProperties$26(_ref, _excluded$26);
	return /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("svg", _objectSpread$26(_objectSpread$26({
		fill: "currentColor",
		fillRule: "evenodd",
		height: size,
		style: _objectSpread$26({
			flex: "none",
			lineHeight: 1
		}, style),
		viewBox: "0 0 24 24",
		width: size,
		xmlns: "http://www.w3.org/2000/svg"
	}, rest), {}, { children: [
		/* @__PURE__ */ (0, react_jsx_runtime.jsx)("title", { children: TITLE$26 }),
		/* @__PURE__ */ (0, react_jsx_runtime.jsx)("path", { d: "M20 2.306v16.797s4-.242 4-4.815V2.306h-4zM4 22.001V5.204s-4 .242-4 4.816V22h4z" }),
		/* @__PURE__ */ (0, react_jsx_runtime.jsx)("path", { d: "M16.318 16.51L11.286 4.94c-.824-1.872-2.168-2.926-4.077-2.926-1.908 0-3.211 1.54-3.211 3.19 0 0 2.405-.333 3.68 2.593l5.036 11.57c.821 1.87 2.168 2.926 4.075 2.926 1.905 0 3.211-1.541 3.211-3.19 0 0-2.406.333-3.682-2.594z" })
	] }));
});
var Mono_default$8 = Icon$26;

//#endregion
//#region node_modules/.pnpm/@lobehub+icons@5.16.0_@types+react@18.3.31_react@18.3.1/node_modules/@lobehub/icons/es/Novita/style.js
var TITLE$25 = "Novita AI";

//#endregion
//#region node_modules/.pnpm/@lobehub+icons@5.16.0_@types+react@18.3.31_react@18.3.1/node_modules/@lobehub/icons/es/Novita/components/Color.js
function _typeof$25(o) {
	"@babel/helpers - typeof";
	return _typeof$25 = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(o$1) {
		return typeof o$1;
	} : function(o$1) {
		return o$1 && "function" == typeof Symbol && o$1.constructor === Symbol && o$1 !== Symbol.prototype ? "symbol" : typeof o$1;
	}, _typeof$25(o);
}
var _excluded$25 = ["size", "style"];
function ownKeys$25(e, r) {
	var t = Object.keys(e);
	if (Object.getOwnPropertySymbols) {
		var o = Object.getOwnPropertySymbols(e);
		r && (o = o.filter(function(r$1) {
			return Object.getOwnPropertyDescriptor(e, r$1).enumerable;
		})), t.push.apply(t, o);
	}
	return t;
}
function _objectSpread$25(e) {
	for (var r = 1; r < arguments.length; r++) {
		var t = null != arguments[r] ? arguments[r] : {};
		r % 2 ? ownKeys$25(Object(t), !0).forEach(function(r$1) {
			_defineProperty$25(e, r$1, t[r$1]);
		}) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys$25(Object(t)).forEach(function(r$1) {
			Object.defineProperty(e, r$1, Object.getOwnPropertyDescriptor(t, r$1));
		});
	}
	return e;
}
function _defineProperty$25(obj, key, value) {
	key = _toPropertyKey$25(key);
	if (key in obj) Object.defineProperty(obj, key, {
		value,
		enumerable: true,
		configurable: true,
		writable: true
	});
	else obj[key] = value;
	return obj;
}
function _toPropertyKey$25(t) {
	var i = _toPrimitive$25(t, "string");
	return "symbol" == _typeof$25(i) ? i : String(i);
}
function _toPrimitive$25(t, r) {
	if ("object" != _typeof$25(t) || !t) return t;
	var e = t[Symbol.toPrimitive];
	if (void 0 !== e) {
		var i = e.call(t, r || "default");
		if ("object" != _typeof$25(i)) return i;
		throw new TypeError("@@toPrimitive must return a primitive value.");
	}
	return ("string" === r ? String : Number)(t);
}
function _objectWithoutProperties$25(source, excluded) {
	if (source == null) return {};
	var target = _objectWithoutPropertiesLoose$25(source, excluded);
	var key, i;
	if (Object.getOwnPropertySymbols) {
		var sourceSymbolKeys = Object.getOwnPropertySymbols(source);
		for (i = 0; i < sourceSymbolKeys.length; i++) {
			key = sourceSymbolKeys[i];
			if (excluded.indexOf(key) >= 0) continue;
			if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue;
			target[key] = source[key];
		}
	}
	return target;
}
function _objectWithoutPropertiesLoose$25(source, excluded) {
	if (source == null) return {};
	var target = {};
	var sourceKeys = Object.keys(source);
	var key, i;
	for (i = 0; i < sourceKeys.length; i++) {
		key = sourceKeys[i];
		if (excluded.indexOf(key) >= 0) continue;
		target[key] = source[key];
	}
	return target;
}
var Icon$25 = /* @__PURE__ */ (0, react.memo)(function(_ref) {
	var _ref$size = _ref.size, size = _ref$size === void 0 ? "1em" : _ref$size, style = _ref.style, rest = _objectWithoutProperties$25(_ref, _excluded$25);
	return /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("svg", _objectSpread$25(_objectSpread$25({
		height: size,
		style: _objectSpread$25({
			flex: "none",
			lineHeight: 1
		}, style),
		viewBox: "0 0 24 24",
		width: size,
		xmlns: "http://www.w3.org/2000/svg"
	}, rest), {}, { children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)("title", { children: TITLE$25 }), /* @__PURE__ */ (0, react_jsx_runtime.jsx)("path", {
		clipRule: "evenodd",
		d: "M9.167 4.17v5.665L0 19.003h9.167v-5.666l5.666 5.666H24L9.167 4.17z",
		fill: "#23D57C",
		fillRule: "evenodd"
	})] }));
});
var Color_default$28 = Icon$25;

//#endregion
//#region node_modules/.pnpm/@lobehub+icons@5.16.0_@types+react@18.3.31_react@18.3.1/node_modules/@lobehub/icons/es/Nvidia/style.js
var TITLE$24 = "Nvidia";

//#endregion
//#region node_modules/.pnpm/@lobehub+icons@5.16.0_@types+react@18.3.31_react@18.3.1/node_modules/@lobehub/icons/es/Nvidia/components/Color.js
function _typeof$24(o) {
	"@babel/helpers - typeof";
	return _typeof$24 = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(o$1) {
		return typeof o$1;
	} : function(o$1) {
		return o$1 && "function" == typeof Symbol && o$1.constructor === Symbol && o$1 !== Symbol.prototype ? "symbol" : typeof o$1;
	}, _typeof$24(o);
}
var _excluded$24 = ["size", "style"];
function ownKeys$24(e, r) {
	var t = Object.keys(e);
	if (Object.getOwnPropertySymbols) {
		var o = Object.getOwnPropertySymbols(e);
		r && (o = o.filter(function(r$1) {
			return Object.getOwnPropertyDescriptor(e, r$1).enumerable;
		})), t.push.apply(t, o);
	}
	return t;
}
function _objectSpread$24(e) {
	for (var r = 1; r < arguments.length; r++) {
		var t = null != arguments[r] ? arguments[r] : {};
		r % 2 ? ownKeys$24(Object(t), !0).forEach(function(r$1) {
			_defineProperty$24(e, r$1, t[r$1]);
		}) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys$24(Object(t)).forEach(function(r$1) {
			Object.defineProperty(e, r$1, Object.getOwnPropertyDescriptor(t, r$1));
		});
	}
	return e;
}
function _defineProperty$24(obj, key, value) {
	key = _toPropertyKey$24(key);
	if (key in obj) Object.defineProperty(obj, key, {
		value,
		enumerable: true,
		configurable: true,
		writable: true
	});
	else obj[key] = value;
	return obj;
}
function _toPropertyKey$24(t) {
	var i = _toPrimitive$24(t, "string");
	return "symbol" == _typeof$24(i) ? i : String(i);
}
function _toPrimitive$24(t, r) {
	if ("object" != _typeof$24(t) || !t) return t;
	var e = t[Symbol.toPrimitive];
	if (void 0 !== e) {
		var i = e.call(t, r || "default");
		if ("object" != _typeof$24(i)) return i;
		throw new TypeError("@@toPrimitive must return a primitive value.");
	}
	return ("string" === r ? String : Number)(t);
}
function _objectWithoutProperties$24(source, excluded) {
	if (source == null) return {};
	var target = _objectWithoutPropertiesLoose$24(source, excluded);
	var key, i;
	if (Object.getOwnPropertySymbols) {
		var sourceSymbolKeys = Object.getOwnPropertySymbols(source);
		for (i = 0; i < sourceSymbolKeys.length; i++) {
			key = sourceSymbolKeys[i];
			if (excluded.indexOf(key) >= 0) continue;
			if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue;
			target[key] = source[key];
		}
	}
	return target;
}
function _objectWithoutPropertiesLoose$24(source, excluded) {
	if (source == null) return {};
	var target = {};
	var sourceKeys = Object.keys(source);
	var key, i;
	for (i = 0; i < sourceKeys.length; i++) {
		key = sourceKeys[i];
		if (excluded.indexOf(key) >= 0) continue;
		target[key] = source[key];
	}
	return target;
}
var Icon$24 = /* @__PURE__ */ (0, react.memo)(function(_ref) {
	var _ref$size = _ref.size, size = _ref$size === void 0 ? "1em" : _ref$size, style = _ref.style, rest = _objectWithoutProperties$24(_ref, _excluded$24);
	return /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("svg", _objectSpread$24(_objectSpread$24({
		height: size,
		style: _objectSpread$24({
			flex: "none",
			lineHeight: 1
		}, style),
		viewBox: "0 0 24 24",
		width: size,
		xmlns: "http://www.w3.org/2000/svg"
	}, rest), {}, { children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)("title", { children: TITLE$24 }), /* @__PURE__ */ (0, react_jsx_runtime.jsx)("path", {
		d: "M10.212 8.976V7.62c.127-.01.256-.017.388-.021 3.596-.117 5.957 3.184 5.957 3.184s-2.548 3.647-5.282 3.647a3.227 3.227 0 01-1.063-.175v-4.109c1.4.174 1.681.812 2.523 2.258l1.873-1.627a4.905 4.905 0 00-3.67-1.846 6.594 6.594 0 00-.729.044m0-4.476v2.025c.13-.01.259-.019.388-.024 5.002-.174 8.261 4.226 8.261 4.226s-3.743 4.69-7.643 4.69c-.338 0-.675-.031-1.007-.092v1.25c.278.038.558.057.838.057 3.629 0 6.253-1.91 8.794-4.169.421.347 2.146 1.193 2.501 1.564-2.416 2.083-8.048 3.763-11.24 3.763-.308 0-.603-.02-.894-.048V19.5H24v-15H10.21zm0 9.756v1.068c-3.356-.616-4.287-4.21-4.287-4.21a7.173 7.173 0 014.287-2.138v1.172h-.005a3.182 3.182 0 00-2.502 1.178s.615 2.276 2.507 2.931m-5.961-3.3c1.436-1.935 3.604-3.148 5.961-3.336V6.523C5.81 6.887 2 10.723 2 10.723s2.158 6.427 8.21 7.015v-1.166C5.77 16 4.25 10.958 4.25 10.958h-.002z",
		fill: "#74B71B",
		fillRule: "nonzero"
	})] }));
});
var Color_default$29 = Icon$24;

//#endregion
//#region node_modules/.pnpm/@lobehub+icons@5.16.0_@types+react@18.3.31_react@18.3.1/node_modules/@lobehub/icons/es/Ollama/style.js
var TITLE$23 = "Ollama";

//#endregion
//#region node_modules/.pnpm/@lobehub+icons@5.16.0_@types+react@18.3.31_react@18.3.1/node_modules/@lobehub/icons/es/Ollama/components/Mono.js
function _typeof$23(o) {
	"@babel/helpers - typeof";
	return _typeof$23 = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(o$1) {
		return typeof o$1;
	} : function(o$1) {
		return o$1 && "function" == typeof Symbol && o$1.constructor === Symbol && o$1 !== Symbol.prototype ? "symbol" : typeof o$1;
	}, _typeof$23(o);
}
var _excluded$23 = ["size", "style"];
function ownKeys$23(e, r) {
	var t = Object.keys(e);
	if (Object.getOwnPropertySymbols) {
		var o = Object.getOwnPropertySymbols(e);
		r && (o = o.filter(function(r$1) {
			return Object.getOwnPropertyDescriptor(e, r$1).enumerable;
		})), t.push.apply(t, o);
	}
	return t;
}
function _objectSpread$23(e) {
	for (var r = 1; r < arguments.length; r++) {
		var t = null != arguments[r] ? arguments[r] : {};
		r % 2 ? ownKeys$23(Object(t), !0).forEach(function(r$1) {
			_defineProperty$23(e, r$1, t[r$1]);
		}) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys$23(Object(t)).forEach(function(r$1) {
			Object.defineProperty(e, r$1, Object.getOwnPropertyDescriptor(t, r$1));
		});
	}
	return e;
}
function _defineProperty$23(obj, key, value) {
	key = _toPropertyKey$23(key);
	if (key in obj) Object.defineProperty(obj, key, {
		value,
		enumerable: true,
		configurable: true,
		writable: true
	});
	else obj[key] = value;
	return obj;
}
function _toPropertyKey$23(t) {
	var i = _toPrimitive$23(t, "string");
	return "symbol" == _typeof$23(i) ? i : String(i);
}
function _toPrimitive$23(t, r) {
	if ("object" != _typeof$23(t) || !t) return t;
	var e = t[Symbol.toPrimitive];
	if (void 0 !== e) {
		var i = e.call(t, r || "default");
		if ("object" != _typeof$23(i)) return i;
		throw new TypeError("@@toPrimitive must return a primitive value.");
	}
	return ("string" === r ? String : Number)(t);
}
function _objectWithoutProperties$23(source, excluded) {
	if (source == null) return {};
	var target = _objectWithoutPropertiesLoose$23(source, excluded);
	var key, i;
	if (Object.getOwnPropertySymbols) {
		var sourceSymbolKeys = Object.getOwnPropertySymbols(source);
		for (i = 0; i < sourceSymbolKeys.length; i++) {
			key = sourceSymbolKeys[i];
			if (excluded.indexOf(key) >= 0) continue;
			if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue;
			target[key] = source[key];
		}
	}
	return target;
}
function _objectWithoutPropertiesLoose$23(source, excluded) {
	if (source == null) return {};
	var target = {};
	var sourceKeys = Object.keys(source);
	var key, i;
	for (i = 0; i < sourceKeys.length; i++) {
		key = sourceKeys[i];
		if (excluded.indexOf(key) >= 0) continue;
		target[key] = source[key];
	}
	return target;
}
var Icon$23 = /* @__PURE__ */ (0, react.memo)(function(_ref) {
	var _ref$size = _ref.size, size = _ref$size === void 0 ? "1em" : _ref$size, style = _ref.style, rest = _objectWithoutProperties$23(_ref, _excluded$23);
	return /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("svg", _objectSpread$23(_objectSpread$23({
		fill: "currentColor",
		fillRule: "evenodd",
		height: size,
		style: _objectSpread$23({
			flex: "none",
			lineHeight: 1
		}, style),
		viewBox: "0 0 24 24",
		width: size,
		xmlns: "http://www.w3.org/2000/svg"
	}, rest), {}, { children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)("title", { children: TITLE$23 }), /* @__PURE__ */ (0, react_jsx_runtime.jsx)("path", { d: "M7.905 1.09c.216.085.411.225.588.41.295.306.544.744.734 1.263.191.522.315 1.1.362 1.68a5.054 5.054 0 012.049-.636l.051-.004c.87-.07 1.73.087 2.48.474.101.053.2.11.297.17.05-.569.172-1.134.36-1.644.19-.52.439-.957.733-1.264a1.67 1.67 0 01.589-.41c.257-.1.53-.118.796-.042.401.114.745.368 1.016.737.248.337.434.769.561 1.287.23.934.27 2.163.115 3.645l.053.04.026.019c.757.576 1.284 1.397 1.563 2.35.435 1.487.216 3.155-.534 4.088l-.018.021.002.003c.417.762.67 1.567.724 2.4l.002.03c.064 1.065-.2 2.137-.814 3.19l-.007.01.01.024c.472 1.157.62 2.322.438 3.486l-.006.039a.651.651 0 01-.747.536.648.648 0 01-.54-.742c.167-1.033.01-2.069-.48-3.123a.643.643 0 01.04-.617l.004-.006c.604-.924.854-1.83.8-2.72-.046-.779-.325-1.544-.8-2.273a.644.644 0 01.18-.886l.009-.006c.243-.159.467-.565.58-1.12a4.229 4.229 0 00-.095-1.974c-.205-.7-.58-1.284-1.105-1.683-.595-.454-1.383-.673-2.38-.61a.653.653 0 01-.632-.371c-.314-.665-.772-1.141-1.343-1.436a3.288 3.288 0 00-1.772-.332c-1.245.099-2.343.801-2.67 1.686a.652.652 0 01-.61.425c-1.067.002-1.893.252-2.497.703-.522.39-.878.935-1.066 1.588a4.07 4.07 0 00-.068 1.886c.112.558.331 1.02.582 1.269l.008.007c.212.207.257.53.109.785-.36.622-.629 1.549-.673 2.44-.05 1.018.186 1.902.719 2.536l.016.019a.643.643 0 01.095.69c-.576 1.236-.753 2.252-.562 3.052a.652.652 0 01-1.269.298c-.243-1.018-.078-2.184.473-3.498l.014-.035-.008-.012a4.339 4.339 0 01-.598-1.309l-.005-.019a5.764 5.764 0 01-.177-1.785c.044-.91.278-1.842.622-2.59l.012-.026-.002-.002c-.293-.418-.51-.953-.63-1.545l-.005-.024a5.352 5.352 0 01.093-2.49c.262-.915.777-1.701 1.536-2.269.06-.045.123-.09.186-.132-.159-1.493-.119-2.73.112-3.67.127-.518.314-.95.562-1.287.27-.368.614-.622 1.015-.737.266-.076.54-.059.797.042zm4.116 9.09c.936 0 1.8.313 2.446.855.63.527 1.005 1.235 1.005 1.94 0 .888-.406 1.58-1.133 2.022-.62.375-1.451.557-2.403.557-1.009 0-1.871-.259-2.493-.734-.617-.47-.963-1.13-.963-1.845 0-.707.398-1.417 1.056-1.946.668-.537 1.55-.849 2.485-.849zm0 .896a3.07 3.07 0 00-1.916.65c-.461.37-.722.835-.722 1.25 0 .428.21.829.61 1.134.455.347 1.124.548 1.943.548.799 0 1.473-.147 1.932-.426.463-.28.7-.686.7-1.257 0-.423-.246-.89-.683-1.256-.484-.405-1.14-.643-1.864-.643zm.662 1.21l.004.004c.12.151.095.37-.056.49l-.292.23v.446a.375.375 0 01-.376.373.375.375 0 01-.376-.373v-.46l-.271-.218a.347.347 0 01-.052-.49.353.353 0 01.494-.051l.215.172.22-.174a.353.353 0 01.49.051zm-5.04-1.919c.478 0 .867.39.867.871a.87.87 0 01-.868.871.87.87 0 01-.867-.87.87.87 0 01.867-.872zm8.706 0c.48 0 .868.39.868.871a.87.87 0 01-.868.871.87.87 0 01-.867-.87.87.87 0 01.867-.872zM7.44 2.3l-.003.002a.659.659 0 00-.285.238l-.005.006c-.138.189-.258.467-.348.832-.17.692-.216 1.631-.124 2.782.43-.128.899-.208 1.404-.237l.01-.001.019-.034c.046-.082.095-.161.148-.239.123-.771.022-1.692-.253-2.444-.134-.364-.297-.65-.453-.813a.628.628 0 00-.107-.09L7.44 2.3zm9.174.04l-.002.001a.628.628 0 00-.107.09c-.156.163-.32.45-.453.814-.29.794-.387 1.776-.23 2.572l.058.097.008.014h.03a5.184 5.184 0 011.466.212c.086-1.124.038-2.043-.128-2.722-.09-.365-.21-.643-.349-.832l-.004-.006a.659.659 0 00-.285-.239h-.004z" })] }));
});
var Mono_default$9 = Icon$23;

//#endregion
//#region node_modules/.pnpm/@lobehub+icons@5.16.0_@types+react@18.3.31_react@18.3.1/node_modules/@lobehub/icons/es/OpenAI/style.js
var TITLE$22 = "OpenAI";

//#endregion
//#region node_modules/.pnpm/@lobehub+icons@5.16.0_@types+react@18.3.31_react@18.3.1/node_modules/@lobehub/icons/es/OpenAI/components/Mono.js
function _typeof$22(o) {
	"@babel/helpers - typeof";
	return _typeof$22 = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(o$1) {
		return typeof o$1;
	} : function(o$1) {
		return o$1 && "function" == typeof Symbol && o$1.constructor === Symbol && o$1 !== Symbol.prototype ? "symbol" : typeof o$1;
	}, _typeof$22(o);
}
var _excluded$22 = ["size", "style"];
function ownKeys$22(e, r) {
	var t = Object.keys(e);
	if (Object.getOwnPropertySymbols) {
		var o = Object.getOwnPropertySymbols(e);
		r && (o = o.filter(function(r$1) {
			return Object.getOwnPropertyDescriptor(e, r$1).enumerable;
		})), t.push.apply(t, o);
	}
	return t;
}
function _objectSpread$22(e) {
	for (var r = 1; r < arguments.length; r++) {
		var t = null != arguments[r] ? arguments[r] : {};
		r % 2 ? ownKeys$22(Object(t), !0).forEach(function(r$1) {
			_defineProperty$22(e, r$1, t[r$1]);
		}) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys$22(Object(t)).forEach(function(r$1) {
			Object.defineProperty(e, r$1, Object.getOwnPropertyDescriptor(t, r$1));
		});
	}
	return e;
}
function _defineProperty$22(obj, key, value) {
	key = _toPropertyKey$22(key);
	if (key in obj) Object.defineProperty(obj, key, {
		value,
		enumerable: true,
		configurable: true,
		writable: true
	});
	else obj[key] = value;
	return obj;
}
function _toPropertyKey$22(t) {
	var i = _toPrimitive$22(t, "string");
	return "symbol" == _typeof$22(i) ? i : String(i);
}
function _toPrimitive$22(t, r) {
	if ("object" != _typeof$22(t) || !t) return t;
	var e = t[Symbol.toPrimitive];
	if (void 0 !== e) {
		var i = e.call(t, r || "default");
		if ("object" != _typeof$22(i)) return i;
		throw new TypeError("@@toPrimitive must return a primitive value.");
	}
	return ("string" === r ? String : Number)(t);
}
function _objectWithoutProperties$22(source, excluded) {
	if (source == null) return {};
	var target = _objectWithoutPropertiesLoose$22(source, excluded);
	var key, i;
	if (Object.getOwnPropertySymbols) {
		var sourceSymbolKeys = Object.getOwnPropertySymbols(source);
		for (i = 0; i < sourceSymbolKeys.length; i++) {
			key = sourceSymbolKeys[i];
			if (excluded.indexOf(key) >= 0) continue;
			if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue;
			target[key] = source[key];
		}
	}
	return target;
}
function _objectWithoutPropertiesLoose$22(source, excluded) {
	if (source == null) return {};
	var target = {};
	var sourceKeys = Object.keys(source);
	var key, i;
	for (i = 0; i < sourceKeys.length; i++) {
		key = sourceKeys[i];
		if (excluded.indexOf(key) >= 0) continue;
		target[key] = source[key];
	}
	return target;
}
var Icon$22 = /* @__PURE__ */ (0, react.memo)(function(_ref) {
	var _ref$size = _ref.size, size = _ref$size === void 0 ? "1em" : _ref$size, style = _ref.style, rest = _objectWithoutProperties$22(_ref, _excluded$22);
	return /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("svg", _objectSpread$22(_objectSpread$22({
		fill: "currentColor",
		fillRule: "evenodd",
		height: size,
		style: _objectSpread$22({
			flex: "none",
			lineHeight: 1
		}, style),
		viewBox: "0 0 24 24",
		width: size,
		xmlns: "http://www.w3.org/2000/svg"
	}, rest), {}, { children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)("title", { children: TITLE$22 }), /* @__PURE__ */ (0, react_jsx_runtime.jsx)("path", { d: "M9.205 8.658v-2.26c0-.19.072-.333.238-.428l4.543-2.616c.619-.357 1.356-.523 2.117-.523 2.854 0 4.662 2.212 4.662 4.566 0 .167 0 .357-.024.547l-4.71-2.759a.797.797 0 00-.856 0l-5.97 3.473zm10.609 8.8V12.06c0-.333-.143-.57-.429-.737l-5.97-3.473 1.95-1.118a.433.433 0 01.476 0l4.543 2.617c1.309.76 2.189 2.378 2.189 3.948 0 1.808-1.07 3.473-2.76 4.163zM7.802 12.703l-1.95-1.142c-.167-.095-.239-.238-.239-.428V5.899c0-2.545 1.95-4.472 4.591-4.472 1 0 1.927.333 2.712.928L8.23 5.067c-.285.166-.428.404-.428.737v6.898zM12 15.128l-2.795-1.57v-3.33L12 8.658l2.795 1.57v3.33L12 15.128zm1.796 7.23c-1 0-1.927-.332-2.712-.927l4.686-2.712c.285-.166.428-.404.428-.737v-6.898l1.974 1.142c.167.095.238.238.238.428v5.233c0 2.545-1.974 4.472-4.614 4.472zm-5.637-5.303l-4.544-2.617c-1.308-.761-2.188-2.378-2.188-3.948A4.482 4.482 0 014.21 6.327v5.423c0 .333.143.571.428.738l5.947 3.449-1.95 1.118a.432.432 0 01-.476 0zm-.262 3.9c-2.688 0-4.662-2.021-4.662-4.519 0-.19.024-.38.047-.57l4.686 2.71c.286.167.571.167.856 0l5.97-3.448v2.26c0 .19-.07.333-.237.428l-4.543 2.616c-.619.357-1.356.523-2.117.523zm5.899 2.83a5.947 5.947 0 005.827-4.756C22.287 18.339 24 15.84 24 13.296c0-1.665-.713-3.282-1.998-4.448.119-.5.19-.999.19-1.498 0-3.401-2.759-5.947-5.946-5.947-.642 0-1.26.095-1.88.31A5.962 5.962 0 0010.205 0a5.947 5.947 0 00-5.827 4.757C1.713 5.447 0 7.945 0 10.49c0 1.666.713 3.283 1.998 4.448-.119.5-.19 1-.19 1.499 0 3.401 2.759 5.946 5.946 5.946.642 0 1.26-.095 1.88-.309a5.96 5.96 0 004.162 1.713z" })] }));
});
var Mono_default$10 = Icon$22;

//#endregion
//#region node_modules/.pnpm/@lobehub+icons@5.16.0_@types+react@18.3.31_react@18.3.1/node_modules/@lobehub/icons/es/OpenCode/style.js
var TITLE$21 = "opencode";

//#endregion
//#region node_modules/.pnpm/@lobehub+icons@5.16.0_@types+react@18.3.31_react@18.3.1/node_modules/@lobehub/icons/es/OpenCode/components/Mono.js
function _typeof$21(o) {
	"@babel/helpers - typeof";
	return _typeof$21 = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(o$1) {
		return typeof o$1;
	} : function(o$1) {
		return o$1 && "function" == typeof Symbol && o$1.constructor === Symbol && o$1 !== Symbol.prototype ? "symbol" : typeof o$1;
	}, _typeof$21(o);
}
var _excluded$21 = ["size", "style"];
function ownKeys$21(e, r) {
	var t = Object.keys(e);
	if (Object.getOwnPropertySymbols) {
		var o = Object.getOwnPropertySymbols(e);
		r && (o = o.filter(function(r$1) {
			return Object.getOwnPropertyDescriptor(e, r$1).enumerable;
		})), t.push.apply(t, o);
	}
	return t;
}
function _objectSpread$21(e) {
	for (var r = 1; r < arguments.length; r++) {
		var t = null != arguments[r] ? arguments[r] : {};
		r % 2 ? ownKeys$21(Object(t), !0).forEach(function(r$1) {
			_defineProperty$21(e, r$1, t[r$1]);
		}) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys$21(Object(t)).forEach(function(r$1) {
			Object.defineProperty(e, r$1, Object.getOwnPropertyDescriptor(t, r$1));
		});
	}
	return e;
}
function _defineProperty$21(obj, key, value) {
	key = _toPropertyKey$21(key);
	if (key in obj) Object.defineProperty(obj, key, {
		value,
		enumerable: true,
		configurable: true,
		writable: true
	});
	else obj[key] = value;
	return obj;
}
function _toPropertyKey$21(t) {
	var i = _toPrimitive$21(t, "string");
	return "symbol" == _typeof$21(i) ? i : String(i);
}
function _toPrimitive$21(t, r) {
	if ("object" != _typeof$21(t) || !t) return t;
	var e = t[Symbol.toPrimitive];
	if (void 0 !== e) {
		var i = e.call(t, r || "default");
		if ("object" != _typeof$21(i)) return i;
		throw new TypeError("@@toPrimitive must return a primitive value.");
	}
	return ("string" === r ? String : Number)(t);
}
function _objectWithoutProperties$21(source, excluded) {
	if (source == null) return {};
	var target = _objectWithoutPropertiesLoose$21(source, excluded);
	var key, i;
	if (Object.getOwnPropertySymbols) {
		var sourceSymbolKeys = Object.getOwnPropertySymbols(source);
		for (i = 0; i < sourceSymbolKeys.length; i++) {
			key = sourceSymbolKeys[i];
			if (excluded.indexOf(key) >= 0) continue;
			if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue;
			target[key] = source[key];
		}
	}
	return target;
}
function _objectWithoutPropertiesLoose$21(source, excluded) {
	if (source == null) return {};
	var target = {};
	var sourceKeys = Object.keys(source);
	var key, i;
	for (i = 0; i < sourceKeys.length; i++) {
		key = sourceKeys[i];
		if (excluded.indexOf(key) >= 0) continue;
		target[key] = source[key];
	}
	return target;
}
var Icon$21 = /* @__PURE__ */ (0, react.memo)(function(_ref) {
	var _ref$size = _ref.size, size = _ref$size === void 0 ? "1em" : _ref$size, style = _ref.style, rest = _objectWithoutProperties$21(_ref, _excluded$21);
	return /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("svg", _objectSpread$21(_objectSpread$21({
		fill: "currentColor",
		fillRule: "evenodd",
		height: size,
		style: _objectSpread$21({
			flex: "none",
			lineHeight: 1
		}, style),
		viewBox: "0 0 24 24",
		width: size,
		xmlns: "http://www.w3.org/2000/svg"
	}, rest), {}, { children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)("title", { children: TITLE$21 }), /* @__PURE__ */ (0, react_jsx_runtime.jsx)("path", { d: "M16 6H8v12h8V6zm4 16H4V2h16v20z" })] }));
});
var Mono_default$11 = Icon$21;

//#endregion
//#region node_modules/.pnpm/@lobehub+icons@5.16.0_@types+react@18.3.31_react@18.3.1/node_modules/@lobehub/icons/es/OpenRouter/style.js
var TITLE$20 = "OpenRouter";

//#endregion
//#region node_modules/.pnpm/@lobehub+icons@5.16.0_@types+react@18.3.31_react@18.3.1/node_modules/@lobehub/icons/es/OpenRouter/components/Color.js
function _typeof$20(o) {
	"@babel/helpers - typeof";
	return _typeof$20 = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(o$1) {
		return typeof o$1;
	} : function(o$1) {
		return o$1 && "function" == typeof Symbol && o$1.constructor === Symbol && o$1 !== Symbol.prototype ? "symbol" : typeof o$1;
	}, _typeof$20(o);
}
var _excluded$20 = ["size", "style"];
function ownKeys$20(e, r) {
	var t = Object.keys(e);
	if (Object.getOwnPropertySymbols) {
		var o = Object.getOwnPropertySymbols(e);
		r && (o = o.filter(function(r$1) {
			return Object.getOwnPropertyDescriptor(e, r$1).enumerable;
		})), t.push.apply(t, o);
	}
	return t;
}
function _objectSpread$20(e) {
	for (var r = 1; r < arguments.length; r++) {
		var t = null != arguments[r] ? arguments[r] : {};
		r % 2 ? ownKeys$20(Object(t), !0).forEach(function(r$1) {
			_defineProperty$20(e, r$1, t[r$1]);
		}) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys$20(Object(t)).forEach(function(r$1) {
			Object.defineProperty(e, r$1, Object.getOwnPropertyDescriptor(t, r$1));
		});
	}
	return e;
}
function _defineProperty$20(obj, key, value) {
	key = _toPropertyKey$20(key);
	if (key in obj) Object.defineProperty(obj, key, {
		value,
		enumerable: true,
		configurable: true,
		writable: true
	});
	else obj[key] = value;
	return obj;
}
function _toPropertyKey$20(t) {
	var i = _toPrimitive$20(t, "string");
	return "symbol" == _typeof$20(i) ? i : String(i);
}
function _toPrimitive$20(t, r) {
	if ("object" != _typeof$20(t) || !t) return t;
	var e = t[Symbol.toPrimitive];
	if (void 0 !== e) {
		var i = e.call(t, r || "default");
		if ("object" != _typeof$20(i)) return i;
		throw new TypeError("@@toPrimitive must return a primitive value.");
	}
	return ("string" === r ? String : Number)(t);
}
function _objectWithoutProperties$20(source, excluded) {
	if (source == null) return {};
	var target = _objectWithoutPropertiesLoose$20(source, excluded);
	var key, i;
	if (Object.getOwnPropertySymbols) {
		var sourceSymbolKeys = Object.getOwnPropertySymbols(source);
		for (i = 0; i < sourceSymbolKeys.length; i++) {
			key = sourceSymbolKeys[i];
			if (excluded.indexOf(key) >= 0) continue;
			if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue;
			target[key] = source[key];
		}
	}
	return target;
}
function _objectWithoutPropertiesLoose$20(source, excluded) {
	if (source == null) return {};
	var target = {};
	var sourceKeys = Object.keys(source);
	var key, i;
	for (i = 0; i < sourceKeys.length; i++) {
		key = sourceKeys[i];
		if (excluded.indexOf(key) >= 0) continue;
		target[key] = source[key];
	}
	return target;
}
var Icon$20 = /* @__PURE__ */ (0, react.memo)(function(_ref) {
	var _ref$size = _ref.size, size = _ref$size === void 0 ? "1em" : _ref$size, style = _ref.style, rest = _objectWithoutProperties$20(_ref, _excluded$20);
	return /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("svg", _objectSpread$20(_objectSpread$20({
		height: size,
		style: _objectSpread$20({
			flex: "none",
			lineHeight: 1
		}, style),
		viewBox: "0 0 24 24",
		width: size,
		xmlns: "http://www.w3.org/2000/svg"
	}, rest), {}, { children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)("title", { children: TITLE$20 }), /* @__PURE__ */ (0, react_jsx_runtime.jsx)("path", {
		d: "M18.654 3.87a5.087 5.087 0 110 10.174L23.7 19.09c.64.641.187 1.737-.72 1.737H8.48a8.479 8.479 0 010-16.958h10.175zM8.479 7.26a5.087 5.087 0 100 10.176 5.087 5.087 0 000-10.175z",
		fill: "#C8FF00"
	})] }));
});
var Color_default$30 = Icon$20;

//#endregion
//#region node_modules/.pnpm/@lobehub+icons@5.16.0_@types+react@18.3.31_react@18.3.1/node_modules/@lobehub/icons/es/Perplexity/style.js
var TITLE$19 = "Perplexity";

//#endregion
//#region node_modules/.pnpm/@lobehub+icons@5.16.0_@types+react@18.3.31_react@18.3.1/node_modules/@lobehub/icons/es/Perplexity/components/Color.js
function _typeof$19(o) {
	"@babel/helpers - typeof";
	return _typeof$19 = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(o$1) {
		return typeof o$1;
	} : function(o$1) {
		return o$1 && "function" == typeof Symbol && o$1.constructor === Symbol && o$1 !== Symbol.prototype ? "symbol" : typeof o$1;
	}, _typeof$19(o);
}
var _excluded$19 = ["size", "style"];
function ownKeys$19(e, r) {
	var t = Object.keys(e);
	if (Object.getOwnPropertySymbols) {
		var o = Object.getOwnPropertySymbols(e);
		r && (o = o.filter(function(r$1) {
			return Object.getOwnPropertyDescriptor(e, r$1).enumerable;
		})), t.push.apply(t, o);
	}
	return t;
}
function _objectSpread$19(e) {
	for (var r = 1; r < arguments.length; r++) {
		var t = null != arguments[r] ? arguments[r] : {};
		r % 2 ? ownKeys$19(Object(t), !0).forEach(function(r$1) {
			_defineProperty$19(e, r$1, t[r$1]);
		}) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys$19(Object(t)).forEach(function(r$1) {
			Object.defineProperty(e, r$1, Object.getOwnPropertyDescriptor(t, r$1));
		});
	}
	return e;
}
function _defineProperty$19(obj, key, value) {
	key = _toPropertyKey$19(key);
	if (key in obj) Object.defineProperty(obj, key, {
		value,
		enumerable: true,
		configurable: true,
		writable: true
	});
	else obj[key] = value;
	return obj;
}
function _toPropertyKey$19(t) {
	var i = _toPrimitive$19(t, "string");
	return "symbol" == _typeof$19(i) ? i : String(i);
}
function _toPrimitive$19(t, r) {
	if ("object" != _typeof$19(t) || !t) return t;
	var e = t[Symbol.toPrimitive];
	if (void 0 !== e) {
		var i = e.call(t, r || "default");
		if ("object" != _typeof$19(i)) return i;
		throw new TypeError("@@toPrimitive must return a primitive value.");
	}
	return ("string" === r ? String : Number)(t);
}
function _objectWithoutProperties$19(source, excluded) {
	if (source == null) return {};
	var target = _objectWithoutPropertiesLoose$19(source, excluded);
	var key, i;
	if (Object.getOwnPropertySymbols) {
		var sourceSymbolKeys = Object.getOwnPropertySymbols(source);
		for (i = 0; i < sourceSymbolKeys.length; i++) {
			key = sourceSymbolKeys[i];
			if (excluded.indexOf(key) >= 0) continue;
			if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue;
			target[key] = source[key];
		}
	}
	return target;
}
function _objectWithoutPropertiesLoose$19(source, excluded) {
	if (source == null) return {};
	var target = {};
	var sourceKeys = Object.keys(source);
	var key, i;
	for (i = 0; i < sourceKeys.length; i++) {
		key = sourceKeys[i];
		if (excluded.indexOf(key) >= 0) continue;
		target[key] = source[key];
	}
	return target;
}
var Icon$19 = /* @__PURE__ */ (0, react.memo)(function(_ref) {
	var _ref$size = _ref.size, size = _ref$size === void 0 ? "1em" : _ref$size, style = _ref.style, rest = _objectWithoutProperties$19(_ref, _excluded$19);
	return /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("svg", _objectSpread$19(_objectSpread$19({
		height: size,
		style: _objectSpread$19({
			flex: "none",
			lineHeight: 1
		}, style),
		viewBox: "0 0 24 24",
		width: size,
		xmlns: "http://www.w3.org/2000/svg"
	}, rest), {}, { children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)("title", { children: TITLE$19 }), /* @__PURE__ */ (0, react_jsx_runtime.jsx)("path", {
		d: "M19.785 0v7.272H22.5V17.62h-2.935V24l-7.037-6.194v6.145h-1.091v-6.152L4.392 24v-6.465H1.5V7.188h2.884V0l7.053 6.494V.19h1.09v6.49L19.786 0zm-7.257 9.044v7.319l5.946 5.234V14.44l-5.946-5.397zm-1.099-.08l-5.946 5.398v7.235l5.946-5.234V8.965zm8.136 7.58h1.844V8.349H13.46l6.105 5.54v2.655zm-8.982-8.28H2.59v8.195h1.8v-2.576l6.192-5.62zM5.475 2.476v4.71h5.115l-5.115-4.71zm13.219 0l-5.115 4.71h5.115v-4.71z",
		fill: "#22B8CD",
		fillRule: "nonzero"
	})] }));
});
var Color_default$31 = Icon$19;

//#endregion
//#region node_modules/.pnpm/@lobehub+icons@5.16.0_@types+react@18.3.31_react@18.3.1/node_modules/@lobehub/icons/es/PPIO/style.js
var TITLE$18 = "PPIO";

//#endregion
//#region node_modules/.pnpm/@lobehub+icons@5.16.0_@types+react@18.3.31_react@18.3.1/node_modules/@lobehub/icons/es/PPIO/components/Color.js
function _typeof$18(o) {
	"@babel/helpers - typeof";
	return _typeof$18 = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(o$1) {
		return typeof o$1;
	} : function(o$1) {
		return o$1 && "function" == typeof Symbol && o$1.constructor === Symbol && o$1 !== Symbol.prototype ? "symbol" : typeof o$1;
	}, _typeof$18(o);
}
var _excluded$18 = ["size", "style"];
function ownKeys$18(e, r) {
	var t = Object.keys(e);
	if (Object.getOwnPropertySymbols) {
		var o = Object.getOwnPropertySymbols(e);
		r && (o = o.filter(function(r$1) {
			return Object.getOwnPropertyDescriptor(e, r$1).enumerable;
		})), t.push.apply(t, o);
	}
	return t;
}
function _objectSpread$18(e) {
	for (var r = 1; r < arguments.length; r++) {
		var t = null != arguments[r] ? arguments[r] : {};
		r % 2 ? ownKeys$18(Object(t), !0).forEach(function(r$1) {
			_defineProperty$18(e, r$1, t[r$1]);
		}) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys$18(Object(t)).forEach(function(r$1) {
			Object.defineProperty(e, r$1, Object.getOwnPropertyDescriptor(t, r$1));
		});
	}
	return e;
}
function _defineProperty$18(obj, key, value) {
	key = _toPropertyKey$18(key);
	if (key in obj) Object.defineProperty(obj, key, {
		value,
		enumerable: true,
		configurable: true,
		writable: true
	});
	else obj[key] = value;
	return obj;
}
function _toPropertyKey$18(t) {
	var i = _toPrimitive$18(t, "string");
	return "symbol" == _typeof$18(i) ? i : String(i);
}
function _toPrimitive$18(t, r) {
	if ("object" != _typeof$18(t) || !t) return t;
	var e = t[Symbol.toPrimitive];
	if (void 0 !== e) {
		var i = e.call(t, r || "default");
		if ("object" != _typeof$18(i)) return i;
		throw new TypeError("@@toPrimitive must return a primitive value.");
	}
	return ("string" === r ? String : Number)(t);
}
function _objectWithoutProperties$18(source, excluded) {
	if (source == null) return {};
	var target = _objectWithoutPropertiesLoose$18(source, excluded);
	var key, i;
	if (Object.getOwnPropertySymbols) {
		var sourceSymbolKeys = Object.getOwnPropertySymbols(source);
		for (i = 0; i < sourceSymbolKeys.length; i++) {
			key = sourceSymbolKeys[i];
			if (excluded.indexOf(key) >= 0) continue;
			if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue;
			target[key] = source[key];
		}
	}
	return target;
}
function _objectWithoutPropertiesLoose$18(source, excluded) {
	if (source == null) return {};
	var target = {};
	var sourceKeys = Object.keys(source);
	var key, i;
	for (i = 0; i < sourceKeys.length; i++) {
		key = sourceKeys[i];
		if (excluded.indexOf(key) >= 0) continue;
		target[key] = source[key];
	}
	return target;
}
var Icon$18 = /* @__PURE__ */ (0, react.memo)(function(_ref) {
	var _ref$size = _ref.size, size = _ref$size === void 0 ? "1em" : _ref$size, style = _ref.style, rest = _objectWithoutProperties$18(_ref, _excluded$18);
	return /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("svg", _objectSpread$18(_objectSpread$18({
		height: size,
		style: _objectSpread$18({
			flex: "none",
			lineHeight: 1
		}, style),
		viewBox: "0 0 24 24",
		width: size,
		xmlns: "http://www.w3.org/2000/svg"
	}, rest), {}, { children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)("title", { children: TITLE$18 }), /* @__PURE__ */ (0, react_jsx_runtime.jsx)("path", {
		clipRule: "evenodd",
		d: "M12.002 0C5.377 0 0 5.37 0 11.994c0 3.266 1.309 6.232 3.43 8.395v-8.383c0-2.288.893-4.447 2.51-6.063a8.513 8.513 0 016.066-2.509h.07l-.074.008c4.735 0 8.575 3.84 8.575 8.571 0 .413-.03.818-.087 1.219l-4.844-4.86A5.12 5.12 0 0012.01 6.87a5.126 5.126 0 00-3.637 1.503 5.107 5.107 0 00-1.507 3.641c0 1.376.536 2.666 1.507 3.64a5.12 5.12 0 003.637 1.504 5.126 5.126 0 003.637-1.503 5.114 5.114 0 001.496-3.348l2.842 2.853c-1.256 3.18-4.353 5.433-7.978 5.433-1.879 0-3.671-.6-5.145-1.714v3.967c1.56.742 3.3 1.155 5.137 1.155C18.623 24 24 18.63 24 12.006 24.008 5.373 18.635.004 12.006.004L12.002 0z",
		fill: "#2874FF",
		fillRule: "evenodd"
	})] }));
});
var Color_default$32 = Icon$18;

//#endregion
//#region node_modules/.pnpm/@lobehub+icons@5.16.0_@types+react@18.3.31_react@18.3.1/node_modules/@lobehub/icons/es/Qiniu/style.js
var TITLE$17 = "Qiniu";

//#endregion
//#region node_modules/.pnpm/@lobehub+icons@5.16.0_@types+react@18.3.31_react@18.3.1/node_modules/@lobehub/icons/es/Qiniu/components/Color.js
function _typeof$17(o) {
	"@babel/helpers - typeof";
	return _typeof$17 = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(o$1) {
		return typeof o$1;
	} : function(o$1) {
		return o$1 && "function" == typeof Symbol && o$1.constructor === Symbol && o$1 !== Symbol.prototype ? "symbol" : typeof o$1;
	}, _typeof$17(o);
}
var _excluded$17 = ["size", "style"];
function ownKeys$17(e, r) {
	var t = Object.keys(e);
	if (Object.getOwnPropertySymbols) {
		var o = Object.getOwnPropertySymbols(e);
		r && (o = o.filter(function(r$1) {
			return Object.getOwnPropertyDescriptor(e, r$1).enumerable;
		})), t.push.apply(t, o);
	}
	return t;
}
function _objectSpread$17(e) {
	for (var r = 1; r < arguments.length; r++) {
		var t = null != arguments[r] ? arguments[r] : {};
		r % 2 ? ownKeys$17(Object(t), !0).forEach(function(r$1) {
			_defineProperty$17(e, r$1, t[r$1]);
		}) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys$17(Object(t)).forEach(function(r$1) {
			Object.defineProperty(e, r$1, Object.getOwnPropertyDescriptor(t, r$1));
		});
	}
	return e;
}
function _defineProperty$17(obj, key, value) {
	key = _toPropertyKey$17(key);
	if (key in obj) Object.defineProperty(obj, key, {
		value,
		enumerable: true,
		configurable: true,
		writable: true
	});
	else obj[key] = value;
	return obj;
}
function _toPropertyKey$17(t) {
	var i = _toPrimitive$17(t, "string");
	return "symbol" == _typeof$17(i) ? i : String(i);
}
function _toPrimitive$17(t, r) {
	if ("object" != _typeof$17(t) || !t) return t;
	var e = t[Symbol.toPrimitive];
	if (void 0 !== e) {
		var i = e.call(t, r || "default");
		if ("object" != _typeof$17(i)) return i;
		throw new TypeError("@@toPrimitive must return a primitive value.");
	}
	return ("string" === r ? String : Number)(t);
}
function _objectWithoutProperties$17(source, excluded) {
	if (source == null) return {};
	var target = _objectWithoutPropertiesLoose$17(source, excluded);
	var key, i;
	if (Object.getOwnPropertySymbols) {
		var sourceSymbolKeys = Object.getOwnPropertySymbols(source);
		for (i = 0; i < sourceSymbolKeys.length; i++) {
			key = sourceSymbolKeys[i];
			if (excluded.indexOf(key) >= 0) continue;
			if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue;
			target[key] = source[key];
		}
	}
	return target;
}
function _objectWithoutPropertiesLoose$17(source, excluded) {
	if (source == null) return {};
	var target = {};
	var sourceKeys = Object.keys(source);
	var key, i;
	for (i = 0; i < sourceKeys.length; i++) {
		key = sourceKeys[i];
		if (excluded.indexOf(key) >= 0) continue;
		target[key] = source[key];
	}
	return target;
}
var Icon$17 = /* @__PURE__ */ (0, react.memo)(function(_ref) {
	var _ref$size = _ref.size, size = _ref$size === void 0 ? "1em" : _ref$size, style = _ref.style, rest = _objectWithoutProperties$17(_ref, _excluded$17);
	return /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("svg", _objectSpread$17(_objectSpread$17({
		height: size,
		style: _objectSpread$17({
			flex: "none",
			lineHeight: 1
		}, style),
		viewBox: "0 0 24 24",
		width: size,
		xmlns: "http://www.w3.org/2000/svg"
	}, rest), {}, { children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)("title", { children: TITLE$17 }), /* @__PURE__ */ (0, react_jsx_runtime.jsx)("path", {
		d: "M23.111 4.6a.914.914 0 00-.861.161A13.443 13.443 0 017.947 8.897L7.38 6.831a1.076 1.076 0 00-1.211-.698l.27 2.18c-1.816-.827-2.313-.946-3.587-2.45C2.674 5.729 1.263 4.472.89 4.6a11.906 11.906 0 005.892 6.497l.738 5.97s.33 2.286 2.473 2.286h4.586c2.144 0 2.474-2.286 2.474-2.286l.518-4.28c-1.393-.11-2.268.857-2.546 1.814-.465 1.614-.465 1.716-.557 1.998-.188.575-.806.644-.806.644h-2.753s-.617-.07-.806-.644c-.12-.371-.727-2.54-1.335-4.74A11.877 11.877 0 0023.11 4.599V4.6z",
		fill: "#06AEEF"
	})] }));
});
var Color_default$33 = Icon$17;

//#endregion
//#region node_modules/.pnpm/@lobehub+icons@5.16.0_@types+react@18.3.31_react@18.3.1/node_modules/@lobehub/icons/es/Qwen/style.js
var TITLE$16 = "Qwen";

//#endregion
//#region node_modules/.pnpm/@lobehub+icons@5.16.0_@types+react@18.3.31_react@18.3.1/node_modules/@lobehub/icons/es/Qwen/components/Color.js
function _typeof$16(o) {
	"@babel/helpers - typeof";
	return _typeof$16 = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(o$1) {
		return typeof o$1;
	} : function(o$1) {
		return o$1 && "function" == typeof Symbol && o$1.constructor === Symbol && o$1 !== Symbol.prototype ? "symbol" : typeof o$1;
	}, _typeof$16(o);
}
var _excluded$16 = ["size", "style"];
function ownKeys$16(e, r) {
	var t = Object.keys(e);
	if (Object.getOwnPropertySymbols) {
		var o = Object.getOwnPropertySymbols(e);
		r && (o = o.filter(function(r$1) {
			return Object.getOwnPropertyDescriptor(e, r$1).enumerable;
		})), t.push.apply(t, o);
	}
	return t;
}
function _objectSpread$16(e) {
	for (var r = 1; r < arguments.length; r++) {
		var t = null != arguments[r] ? arguments[r] : {};
		r % 2 ? ownKeys$16(Object(t), !0).forEach(function(r$1) {
			_defineProperty$16(e, r$1, t[r$1]);
		}) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys$16(Object(t)).forEach(function(r$1) {
			Object.defineProperty(e, r$1, Object.getOwnPropertyDescriptor(t, r$1));
		});
	}
	return e;
}
function _defineProperty$16(obj, key, value) {
	key = _toPropertyKey$16(key);
	if (key in obj) Object.defineProperty(obj, key, {
		value,
		enumerable: true,
		configurable: true,
		writable: true
	});
	else obj[key] = value;
	return obj;
}
function _toPropertyKey$16(t) {
	var i = _toPrimitive$16(t, "string");
	return "symbol" == _typeof$16(i) ? i : String(i);
}
function _toPrimitive$16(t, r) {
	if ("object" != _typeof$16(t) || !t) return t;
	var e = t[Symbol.toPrimitive];
	if (void 0 !== e) {
		var i = e.call(t, r || "default");
		if ("object" != _typeof$16(i)) return i;
		throw new TypeError("@@toPrimitive must return a primitive value.");
	}
	return ("string" === r ? String : Number)(t);
}
function _objectWithoutProperties$16(source, excluded) {
	if (source == null) return {};
	var target = _objectWithoutPropertiesLoose$16(source, excluded);
	var key, i;
	if (Object.getOwnPropertySymbols) {
		var sourceSymbolKeys = Object.getOwnPropertySymbols(source);
		for (i = 0; i < sourceSymbolKeys.length; i++) {
			key = sourceSymbolKeys[i];
			if (excluded.indexOf(key) >= 0) continue;
			if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue;
			target[key] = source[key];
		}
	}
	return target;
}
function _objectWithoutPropertiesLoose$16(source, excluded) {
	if (source == null) return {};
	var target = {};
	var sourceKeys = Object.keys(source);
	var key, i;
	for (i = 0; i < sourceKeys.length; i++) {
		key = sourceKeys[i];
		if (excluded.indexOf(key) >= 0) continue;
		target[key] = source[key];
	}
	return target;
}
var Icon$16 = /* @__PURE__ */ (0, react.memo)(function(_ref) {
	var _ref$size = _ref.size, size = _ref$size === void 0 ? "1em" : _ref$size, style = _ref.style, rest = _objectWithoutProperties$16(_ref, _excluded$16);
	var _useFillId = useFillId(TITLE$16), id = _useFillId.id, fill = _useFillId.fill;
	return /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("svg", _objectSpread$16(_objectSpread$16({
		height: size,
		style: _objectSpread$16({
			flex: "none",
			lineHeight: 1
		}, style),
		viewBox: "0 0 24 24",
		width: size,
		xmlns: "http://www.w3.org/2000/svg"
	}, rest), {}, { children: [
		/* @__PURE__ */ (0, react_jsx_runtime.jsx)("title", { children: TITLE$16 }),
		/* @__PURE__ */ (0, react_jsx_runtime.jsx)("path", {
			d: "M12.604 1.34c.393.69.784 1.382 1.174 2.075a.18.18 0 00.157.091h5.552c.174 0 .322.11.446.327l1.454 2.57c.19.337.24.478.024.837-.26.43-.513.864-.76 1.3l-.367.658c-.106.196-.223.28-.04.512l2.652 4.637c.172.301.111.494-.043.77-.437.785-.882 1.564-1.335 2.34-.159.272-.352.375-.68.37-.777-.016-1.552-.01-2.327.016a.099.099 0 00-.081.05 575.097 575.097 0 01-2.705 4.74c-.169.293-.38.363-.725.364-.997.003-2.002.004-3.017.002a.537.537 0 01-.465-.271l-1.335-2.323a.09.09 0 00-.083-.049H4.982c-.285.03-.553-.001-.805-.092l-1.603-2.77a.543.543 0 01-.002-.54l1.207-2.12a.198.198 0 000-.197 550.951 550.951 0 01-1.875-3.272l-.79-1.395c-.16-.31-.173-.496.095-.965.465-.813.927-1.625 1.387-2.436.132-.234.304-.334.584-.335a338.3 338.3 0 012.589-.001.124.124 0 00.107-.063l2.806-4.895a.488.488 0 01.422-.246c.524-.001 1.053 0 1.583-.006L11.704 1c.341-.003.724.032.9.34zm-3.432.403a.06.06 0 00-.052.03L6.254 6.788a.157.157 0 01-.135.078H3.253c-.056 0-.07.025-.041.074l5.81 10.156c.025.042.013.062-.034.063l-2.795.015a.218.218 0 00-.2.116l-1.32 2.31c-.044.078-.021.118.068.118l5.716.008c.046 0 .08.02.104.061l1.403 2.454c.046.081.092.082.139 0l5.006-8.76.783-1.382a.055.055 0 01.096 0l1.424 2.53a.122.122 0 00.107.062l2.763-.02a.04.04 0 00.035-.02.041.041 0 000-.04l-2.9-5.086a.108.108 0 010-.113l.293-.507 1.12-1.977c.024-.041.012-.062-.035-.062H9.2c-.059 0-.073-.026-.043-.077l1.434-2.505a.107.107 0 000-.114L9.225 1.774a.06.06 0 00-.053-.031zm6.29 8.02c.046 0 .058.02.034.06l-.832 1.465-2.613 4.585a.056.056 0 01-.05.029.058.058 0 01-.05-.029L8.498 9.841c-.02-.034-.01-.052.028-.054l.216-.012 6.722-.012z",
			fill,
			fillRule: "nonzero"
		}),
		/* @__PURE__ */ (0, react_jsx_runtime.jsx)("defs", { children: /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("linearGradient", {
			id,
			x1: "0%",
			x2: "100%",
			y1: "0%",
			y2: "0%",
			children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)("stop", {
				offset: "0%",
				stopColor: "#6336E7",
				stopOpacity: ".84"
			}), /* @__PURE__ */ (0, react_jsx_runtime.jsx)("stop", {
				offset: "100%",
				stopColor: "#6F69F7",
				stopOpacity: ".84"
			})]
		}) })
	] }));
});
var Color_default$34 = Icon$16;

//#endregion
//#region node_modules/.pnpm/@lobehub+icons@5.16.0_@types+react@18.3.31_react@18.3.1/node_modules/@lobehub/icons/es/SambaNova/style.js
var TITLE$15 = "SambaNova";

//#endregion
//#region node_modules/.pnpm/@lobehub+icons@5.16.0_@types+react@18.3.31_react@18.3.1/node_modules/@lobehub/icons/es/SambaNova/components/Color.js
function _typeof$15(o) {
	"@babel/helpers - typeof";
	return _typeof$15 = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(o$1) {
		return typeof o$1;
	} : function(o$1) {
		return o$1 && "function" == typeof Symbol && o$1.constructor === Symbol && o$1 !== Symbol.prototype ? "symbol" : typeof o$1;
	}, _typeof$15(o);
}
var _excluded$15 = ["size", "style"];
function ownKeys$15(e, r) {
	var t = Object.keys(e);
	if (Object.getOwnPropertySymbols) {
		var o = Object.getOwnPropertySymbols(e);
		r && (o = o.filter(function(r$1) {
			return Object.getOwnPropertyDescriptor(e, r$1).enumerable;
		})), t.push.apply(t, o);
	}
	return t;
}
function _objectSpread$15(e) {
	for (var r = 1; r < arguments.length; r++) {
		var t = null != arguments[r] ? arguments[r] : {};
		r % 2 ? ownKeys$15(Object(t), !0).forEach(function(r$1) {
			_defineProperty$15(e, r$1, t[r$1]);
		}) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys$15(Object(t)).forEach(function(r$1) {
			Object.defineProperty(e, r$1, Object.getOwnPropertyDescriptor(t, r$1));
		});
	}
	return e;
}
function _defineProperty$15(obj, key, value) {
	key = _toPropertyKey$15(key);
	if (key in obj) Object.defineProperty(obj, key, {
		value,
		enumerable: true,
		configurable: true,
		writable: true
	});
	else obj[key] = value;
	return obj;
}
function _toPropertyKey$15(t) {
	var i = _toPrimitive$15(t, "string");
	return "symbol" == _typeof$15(i) ? i : String(i);
}
function _toPrimitive$15(t, r) {
	if ("object" != _typeof$15(t) || !t) return t;
	var e = t[Symbol.toPrimitive];
	if (void 0 !== e) {
		var i = e.call(t, r || "default");
		if ("object" != _typeof$15(i)) return i;
		throw new TypeError("@@toPrimitive must return a primitive value.");
	}
	return ("string" === r ? String : Number)(t);
}
function _objectWithoutProperties$15(source, excluded) {
	if (source == null) return {};
	var target = _objectWithoutPropertiesLoose$15(source, excluded);
	var key, i;
	if (Object.getOwnPropertySymbols) {
		var sourceSymbolKeys = Object.getOwnPropertySymbols(source);
		for (i = 0; i < sourceSymbolKeys.length; i++) {
			key = sourceSymbolKeys[i];
			if (excluded.indexOf(key) >= 0) continue;
			if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue;
			target[key] = source[key];
		}
	}
	return target;
}
function _objectWithoutPropertiesLoose$15(source, excluded) {
	if (source == null) return {};
	var target = {};
	var sourceKeys = Object.keys(source);
	var key, i;
	for (i = 0; i < sourceKeys.length; i++) {
		key = sourceKeys[i];
		if (excluded.indexOf(key) >= 0) continue;
		target[key] = source[key];
	}
	return target;
}
var Icon$15 = /* @__PURE__ */ (0, react.memo)(function(_ref) {
	var _ref$size = _ref.size, size = _ref$size === void 0 ? "1em" : _ref$size, style = _ref.style, rest = _objectWithoutProperties$15(_ref, _excluded$15);
	return /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("svg", _objectSpread$15(_objectSpread$15({
		height: size,
		style: _objectSpread$15({
			flex: "none",
			lineHeight: 1
		}, style),
		viewBox: "0 0 24 24",
		width: size,
		xmlns: "http://www.w3.org/2000/svg"
	}, rest), {}, { children: [
		/* @__PURE__ */ (0, react_jsx_runtime.jsx)("title", { children: TITLE$15 }),
		/* @__PURE__ */ (0, react_jsx_runtime.jsx)("path", {
			d: "M23 23h-1.223V8.028c0-3.118-2.568-5.806-5.744-5.806H8.027c-3.176 0-5.744 2.565-5.744 5.686 0 3.119 2.568 5.684 5.744 5.684h.794c1.346 0 2.445 1.1 2.445 2.444 0 1.346-1.1 2.446-2.445 2.446H1v-1.223h7.761c.671 0 1.223-.551 1.223-1.16 0-.67-.552-1.16-1.223-1.16h-.794C4.177 14.872 1 11.756 1 7.909 1 4.058 4.176 1 8.027 1h8.066C19.88 1 23 4.239 23 8.028V23z",
			fill: "#EE7624"
		}),
		/* @__PURE__ */ (0, react_jsx_runtime.jsx)("path", {
			d: "M8.884 12.672c1.71.06 3.361 1.588 3.361 3.422 0 1.833-1.528 3.421-3.421 3.421H1v1.223h7.761c2.568 0 4.705-2.077 4.705-4.644 0-.672-.123-1.283-.43-1.894-.245-.551-.67-1.1-1.099-1.528-.489-.429-1.039-.734-1.65-.977-.525-.175-1.048-.193-1.594-.212-.218-.008-.441-.016-.669-.034-.428 0-1.406-.245-1.956-.61a3.369 3.369 0 01-1.223-1.406c-.183-.489-.305-.977-.305-1.528A3.417 3.417 0 017.96 4.482h8.066c1.895 0 3.422 1.65 3.422 3.483v15.032h1.223V8.027c0-2.568-2.077-4.768-4.645-4.768h-8c-2.568 0-4.705 2.077-4.705 4.646 0 .67.123 1.282.43 1.894a4.45 4.45 0 001.099 1.528c.429.428 1.039.734 1.588.976.306.123.611.183.976.246.857.06 1.406.123 1.466.123h.003z",
			fill: "#EE7624"
		}),
		/* @__PURE__ */ (0, react_jsx_runtime.jsx)("path", {
			d: "M1 23h7.761v-.003c3.85 0 7.03-3.116 7.09-7.026 0-3.79-3.117-6.906-6.967-6.906H8.09c-.672 0-1.222-.552-1.222-1.16 0-.608.487-1.16 1.159-1.16h8.069c.608 0 1.159.611 1.159 1.283v14.97h1.223V8.024c0-1.345-1.1-2.505-2.445-2.505H7.967a2.451 2.451 0 00-2.445 2.445 2.45 2.45 0 002.445 2.445h.794c3.176 0 5.744 2.568 5.744 5.684s-2.568 5.684-5.744 5.684H1V23z",
			fill: "#EE7624"
		})
	] }));
});
var Color_default$35 = Icon$15;

//#endregion
//#region node_modules/.pnpm/@lobehub+icons@5.16.0_@types+react@18.3.31_react@18.3.1/node_modules/@lobehub/icons/es/SiliconCloud/style.js
var TITLE$14 = "SiliconCloud";

//#endregion
//#region node_modules/.pnpm/@lobehub+icons@5.16.0_@types+react@18.3.31_react@18.3.1/node_modules/@lobehub/icons/es/SiliconCloud/components/Color.js
function _typeof$14(o) {
	"@babel/helpers - typeof";
	return _typeof$14 = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(o$1) {
		return typeof o$1;
	} : function(o$1) {
		return o$1 && "function" == typeof Symbol && o$1.constructor === Symbol && o$1 !== Symbol.prototype ? "symbol" : typeof o$1;
	}, _typeof$14(o);
}
var _excluded$14 = ["size", "style"];
function ownKeys$14(e, r) {
	var t = Object.keys(e);
	if (Object.getOwnPropertySymbols) {
		var o = Object.getOwnPropertySymbols(e);
		r && (o = o.filter(function(r$1) {
			return Object.getOwnPropertyDescriptor(e, r$1).enumerable;
		})), t.push.apply(t, o);
	}
	return t;
}
function _objectSpread$14(e) {
	for (var r = 1; r < arguments.length; r++) {
		var t = null != arguments[r] ? arguments[r] : {};
		r % 2 ? ownKeys$14(Object(t), !0).forEach(function(r$1) {
			_defineProperty$14(e, r$1, t[r$1]);
		}) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys$14(Object(t)).forEach(function(r$1) {
			Object.defineProperty(e, r$1, Object.getOwnPropertyDescriptor(t, r$1));
		});
	}
	return e;
}
function _defineProperty$14(obj, key, value) {
	key = _toPropertyKey$14(key);
	if (key in obj) Object.defineProperty(obj, key, {
		value,
		enumerable: true,
		configurable: true,
		writable: true
	});
	else obj[key] = value;
	return obj;
}
function _toPropertyKey$14(t) {
	var i = _toPrimitive$14(t, "string");
	return "symbol" == _typeof$14(i) ? i : String(i);
}
function _toPrimitive$14(t, r) {
	if ("object" != _typeof$14(t) || !t) return t;
	var e = t[Symbol.toPrimitive];
	if (void 0 !== e) {
		var i = e.call(t, r || "default");
		if ("object" != _typeof$14(i)) return i;
		throw new TypeError("@@toPrimitive must return a primitive value.");
	}
	return ("string" === r ? String : Number)(t);
}
function _objectWithoutProperties$14(source, excluded) {
	if (source == null) return {};
	var target = _objectWithoutPropertiesLoose$14(source, excluded);
	var key, i;
	if (Object.getOwnPropertySymbols) {
		var sourceSymbolKeys = Object.getOwnPropertySymbols(source);
		for (i = 0; i < sourceSymbolKeys.length; i++) {
			key = sourceSymbolKeys[i];
			if (excluded.indexOf(key) >= 0) continue;
			if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue;
			target[key] = source[key];
		}
	}
	return target;
}
function _objectWithoutPropertiesLoose$14(source, excluded) {
	if (source == null) return {};
	var target = {};
	var sourceKeys = Object.keys(source);
	var key, i;
	for (i = 0; i < sourceKeys.length; i++) {
		key = sourceKeys[i];
		if (excluded.indexOf(key) >= 0) continue;
		target[key] = source[key];
	}
	return target;
}
var Icon$14 = /* @__PURE__ */ (0, react.memo)(function(_ref) {
	var _ref$size = _ref.size, size = _ref$size === void 0 ? "1em" : _ref$size, style = _ref.style, rest = _objectWithoutProperties$14(_ref, _excluded$14);
	return /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("svg", _objectSpread$14(_objectSpread$14({
		height: size,
		style: _objectSpread$14({
			flex: "none",
			lineHeight: 1
		}, style),
		viewBox: "0 0 24 24",
		width: size,
		xmlns: "http://www.w3.org/2000/svg"
	}, rest), {}, { children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)("title", { children: TITLE$14 }), /* @__PURE__ */ (0, react_jsx_runtime.jsx)("path", {
		clipRule: "evenodd",
		d: "M22.956 6.521H12.522c-.577 0-1.044.468-1.044 1.044v3.13c0 .577-.466 1.044-1.043 1.044H1.044c-.577 0-1.044.467-1.044 1.044v4.174C0 17.533.467 18 1.044 18h10.434c.577 0 1.044-.467 1.044-1.043v-3.13c0-.578.466-1.044 1.043-1.044h9.391c.577 0 1.044-.467 1.044-1.044V7.565c0-.576-.467-1.044-1.044-1.044z",
		fill: "#6E29F6",
		fillRule: "evenodd"
	})] }));
});
var Color_default$36 = Icon$14;

//#endregion
//#region node_modules/.pnpm/@lobehub+icons@5.16.0_@types+react@18.3.31_react@18.3.1/node_modules/@lobehub/icons/es/Spark/style.js
var TITLE$13 = "Spark";

//#endregion
//#region node_modules/.pnpm/@lobehub+icons@5.16.0_@types+react@18.3.31_react@18.3.1/node_modules/@lobehub/icons/es/Spark/components/Color.js
function _typeof$13(o) {
	"@babel/helpers - typeof";
	return _typeof$13 = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(o$1) {
		return typeof o$1;
	} : function(o$1) {
		return o$1 && "function" == typeof Symbol && o$1.constructor === Symbol && o$1 !== Symbol.prototype ? "symbol" : typeof o$1;
	}, _typeof$13(o);
}
var _excluded$13 = ["size", "style"];
function ownKeys$13(e, r) {
	var t = Object.keys(e);
	if (Object.getOwnPropertySymbols) {
		var o = Object.getOwnPropertySymbols(e);
		r && (o = o.filter(function(r$1) {
			return Object.getOwnPropertyDescriptor(e, r$1).enumerable;
		})), t.push.apply(t, o);
	}
	return t;
}
function _objectSpread$13(e) {
	for (var r = 1; r < arguments.length; r++) {
		var t = null != arguments[r] ? arguments[r] : {};
		r % 2 ? ownKeys$13(Object(t), !0).forEach(function(r$1) {
			_defineProperty$13(e, r$1, t[r$1]);
		}) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys$13(Object(t)).forEach(function(r$1) {
			Object.defineProperty(e, r$1, Object.getOwnPropertyDescriptor(t, r$1));
		});
	}
	return e;
}
function _defineProperty$13(obj, key, value) {
	key = _toPropertyKey$13(key);
	if (key in obj) Object.defineProperty(obj, key, {
		value,
		enumerable: true,
		configurable: true,
		writable: true
	});
	else obj[key] = value;
	return obj;
}
function _toPropertyKey$13(t) {
	var i = _toPrimitive$13(t, "string");
	return "symbol" == _typeof$13(i) ? i : String(i);
}
function _toPrimitive$13(t, r) {
	if ("object" != _typeof$13(t) || !t) return t;
	var e = t[Symbol.toPrimitive];
	if (void 0 !== e) {
		var i = e.call(t, r || "default");
		if ("object" != _typeof$13(i)) return i;
		throw new TypeError("@@toPrimitive must return a primitive value.");
	}
	return ("string" === r ? String : Number)(t);
}
function _objectWithoutProperties$13(source, excluded) {
	if (source == null) return {};
	var target = _objectWithoutPropertiesLoose$13(source, excluded);
	var key, i;
	if (Object.getOwnPropertySymbols) {
		var sourceSymbolKeys = Object.getOwnPropertySymbols(source);
		for (i = 0; i < sourceSymbolKeys.length; i++) {
			key = sourceSymbolKeys[i];
			if (excluded.indexOf(key) >= 0) continue;
			if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue;
			target[key] = source[key];
		}
	}
	return target;
}
function _objectWithoutPropertiesLoose$13(source, excluded) {
	if (source == null) return {};
	var target = {};
	var sourceKeys = Object.keys(source);
	var key, i;
	for (i = 0; i < sourceKeys.length; i++) {
		key = sourceKeys[i];
		if (excluded.indexOf(key) >= 0) continue;
		target[key] = source[key];
	}
	return target;
}
var Icon$13 = /* @__PURE__ */ (0, react.memo)(function(_ref) {
	var _ref$size = _ref.size, size = _ref$size === void 0 ? "1em" : _ref$size, style = _ref.style, rest = _objectWithoutProperties$13(_ref, _excluded$13);
	return /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("svg", _objectSpread$13(_objectSpread$13({
		height: size,
		style: _objectSpread$13({
			flex: "none",
			lineHeight: 1
		}, style),
		viewBox: "0 0 24 24",
		width: size,
		xmlns: "http://www.w3.org/2000/svg"
	}, rest), {}, { children: [
		/* @__PURE__ */ (0, react_jsx_runtime.jsx)("title", { children: TITLE$13 }),
		/* @__PURE__ */ (0, react_jsx_runtime.jsx)("path", {
			d: "M2 13.08C2 9.182 4.772 6.367 9.32 2.122c-.65 7.883 6.41 8.272 5.023 12.214-.99 2.815-4.244 1.949-4.59 1.342 0 0 1.212.347 1.385-.866.174-1.213-2.252-1.862-3.81-4.937-2.6 2.988-.954 9.008 4.2 9.008 4.764 0 6.583-4.937 4.894-8.099 0 0 4.071.693 4.418 3.811.346 3.119-3.638 8.533-9.095 8.403C6.288 22.868 2 18.84 2 13.08z",
			fill: "#3DC8F9"
		}),
		/* @__PURE__ */ (0, react_jsx_runtime.jsx)("path", {
			d: "M17.852 6.107L11.615 0c-.52 5.933.866 8.374 4.894 9.485 2.729.753 3.307 1.04 4.504 2.772-.338-2.407-.78-3.812-3.161-6.15z",
			fill: "#EA0100"
		}),
		/* @__PURE__ */ (0, react_jsx_runtime.jsx)("path", {
			clipRule: "evenodd",
			d: "M9.033 18.323c.709.354 1.542.56 2.495.56 4.764 0 6.583-4.937 4.894-8.099 0 0 4.071.693 4.418 3.811.156 1.403-.565 3.27-1.902 4.89-3.458 1.57-7.29.84-9.905-1.162z",
			fill: "#1652D8",
			fillRule: "evenodd"
		})
	] }));
});
var Color_default$37 = Icon$13;

//#endregion
//#region node_modules/.pnpm/@lobehub+icons@5.16.0_@types+react@18.3.31_react@18.3.1/node_modules/@lobehub/icons/es/Stepfun/style.js
var TITLE$12 = "StepFun";

//#endregion
//#region node_modules/.pnpm/@lobehub+icons@5.16.0_@types+react@18.3.31_react@18.3.1/node_modules/@lobehub/icons/es/Stepfun/components/Mono.js
function _typeof$12(o) {
	"@babel/helpers - typeof";
	return _typeof$12 = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(o$1) {
		return typeof o$1;
	} : function(o$1) {
		return o$1 && "function" == typeof Symbol && o$1.constructor === Symbol && o$1 !== Symbol.prototype ? "symbol" : typeof o$1;
	}, _typeof$12(o);
}
var _excluded$12 = ["size", "style"];
function ownKeys$12(e, r) {
	var t = Object.keys(e);
	if (Object.getOwnPropertySymbols) {
		var o = Object.getOwnPropertySymbols(e);
		r && (o = o.filter(function(r$1) {
			return Object.getOwnPropertyDescriptor(e, r$1).enumerable;
		})), t.push.apply(t, o);
	}
	return t;
}
function _objectSpread$12(e) {
	for (var r = 1; r < arguments.length; r++) {
		var t = null != arguments[r] ? arguments[r] : {};
		r % 2 ? ownKeys$12(Object(t), !0).forEach(function(r$1) {
			_defineProperty$12(e, r$1, t[r$1]);
		}) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys$12(Object(t)).forEach(function(r$1) {
			Object.defineProperty(e, r$1, Object.getOwnPropertyDescriptor(t, r$1));
		});
	}
	return e;
}
function _defineProperty$12(obj, key, value) {
	key = _toPropertyKey$12(key);
	if (key in obj) Object.defineProperty(obj, key, {
		value,
		enumerable: true,
		configurable: true,
		writable: true
	});
	else obj[key] = value;
	return obj;
}
function _toPropertyKey$12(t) {
	var i = _toPrimitive$12(t, "string");
	return "symbol" == _typeof$12(i) ? i : String(i);
}
function _toPrimitive$12(t, r) {
	if ("object" != _typeof$12(t) || !t) return t;
	var e = t[Symbol.toPrimitive];
	if (void 0 !== e) {
		var i = e.call(t, r || "default");
		if ("object" != _typeof$12(i)) return i;
		throw new TypeError("@@toPrimitive must return a primitive value.");
	}
	return ("string" === r ? String : Number)(t);
}
function _objectWithoutProperties$12(source, excluded) {
	if (source == null) return {};
	var target = _objectWithoutPropertiesLoose$12(source, excluded);
	var key, i;
	if (Object.getOwnPropertySymbols) {
		var sourceSymbolKeys = Object.getOwnPropertySymbols(source);
		for (i = 0; i < sourceSymbolKeys.length; i++) {
			key = sourceSymbolKeys[i];
			if (excluded.indexOf(key) >= 0) continue;
			if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue;
			target[key] = source[key];
		}
	}
	return target;
}
function _objectWithoutPropertiesLoose$12(source, excluded) {
	if (source == null) return {};
	var target = {};
	var sourceKeys = Object.keys(source);
	var key, i;
	for (i = 0; i < sourceKeys.length; i++) {
		key = sourceKeys[i];
		if (excluded.indexOf(key) >= 0) continue;
		target[key] = source[key];
	}
	return target;
}
var Icon$12 = /* @__PURE__ */ (0, react.memo)(function(_ref) {
	var _ref$size = _ref.size, size = _ref$size === void 0 ? "1em" : _ref$size, style = _ref.style, rest = _objectWithoutProperties$12(_ref, _excluded$12);
	return /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("svg", _objectSpread$12(_objectSpread$12({
		fill: "currentColor",
		fillRule: "evenodd",
		height: size,
		style: _objectSpread$12({
			flex: "none",
			lineHeight: 1
		}, style),
		viewBox: "0 0 24 24",
		width: size,
		xmlns: "http://www.w3.org/2000/svg"
	}, rest), {}, { children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)("title", { children: TITLE$12 }), /* @__PURE__ */ (0, react_jsx_runtime.jsx)("path", { d: "M12 0C5.372 0 0 5.372 0 12s5.372 12 12 12 12-5.372 12-12S18.628 0 12 0zM8.762 19.614H4.376v-4.386h4.386v4.386zm5.423 0H9.798v-4.386h4.387v4.386zm0-5.42H9.798V9.81h4.387v4.386zm0-5.418H9.798V4.39h4.387v4.386zm5.422-.004h-4.386V4.386h4.386v4.386z" })] }));
});
var Mono_default$12 = Icon$12;

//#endregion
//#region node_modules/.pnpm/@lobehub+icons@5.16.0_@types+react@18.3.31_react@18.3.1/node_modules/@lobehub/icons/es/Together/style.js
var TITLE$11 = "together.ai";

//#endregion
//#region node_modules/.pnpm/@lobehub+icons@5.16.0_@types+react@18.3.31_react@18.3.1/node_modules/@lobehub/icons/es/Together/components/Color.js
function _typeof$11(o) {
	"@babel/helpers - typeof";
	return _typeof$11 = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(o$1) {
		return typeof o$1;
	} : function(o$1) {
		return o$1 && "function" == typeof Symbol && o$1.constructor === Symbol && o$1 !== Symbol.prototype ? "symbol" : typeof o$1;
	}, _typeof$11(o);
}
var _excluded$11 = ["size", "style"];
function ownKeys$11(e, r) {
	var t = Object.keys(e);
	if (Object.getOwnPropertySymbols) {
		var o = Object.getOwnPropertySymbols(e);
		r && (o = o.filter(function(r$1) {
			return Object.getOwnPropertyDescriptor(e, r$1).enumerable;
		})), t.push.apply(t, o);
	}
	return t;
}
function _objectSpread$11(e) {
	for (var r = 1; r < arguments.length; r++) {
		var t = null != arguments[r] ? arguments[r] : {};
		r % 2 ? ownKeys$11(Object(t), !0).forEach(function(r$1) {
			_defineProperty$11(e, r$1, t[r$1]);
		}) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys$11(Object(t)).forEach(function(r$1) {
			Object.defineProperty(e, r$1, Object.getOwnPropertyDescriptor(t, r$1));
		});
	}
	return e;
}
function _defineProperty$11(obj, key, value) {
	key = _toPropertyKey$11(key);
	if (key in obj) Object.defineProperty(obj, key, {
		value,
		enumerable: true,
		configurable: true,
		writable: true
	});
	else obj[key] = value;
	return obj;
}
function _toPropertyKey$11(t) {
	var i = _toPrimitive$11(t, "string");
	return "symbol" == _typeof$11(i) ? i : String(i);
}
function _toPrimitive$11(t, r) {
	if ("object" != _typeof$11(t) || !t) return t;
	var e = t[Symbol.toPrimitive];
	if (void 0 !== e) {
		var i = e.call(t, r || "default");
		if ("object" != _typeof$11(i)) return i;
		throw new TypeError("@@toPrimitive must return a primitive value.");
	}
	return ("string" === r ? String : Number)(t);
}
function _objectWithoutProperties$11(source, excluded) {
	if (source == null) return {};
	var target = _objectWithoutPropertiesLoose$11(source, excluded);
	var key, i;
	if (Object.getOwnPropertySymbols) {
		var sourceSymbolKeys = Object.getOwnPropertySymbols(source);
		for (i = 0; i < sourceSymbolKeys.length; i++) {
			key = sourceSymbolKeys[i];
			if (excluded.indexOf(key) >= 0) continue;
			if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue;
			target[key] = source[key];
		}
	}
	return target;
}
function _objectWithoutPropertiesLoose$11(source, excluded) {
	if (source == null) return {};
	var target = {};
	var sourceKeys = Object.keys(source);
	var key, i;
	for (i = 0; i < sourceKeys.length; i++) {
		key = sourceKeys[i];
		if (excluded.indexOf(key) >= 0) continue;
		target[key] = source[key];
	}
	return target;
}
var Icon$11 = /* @__PURE__ */ (0, react.memo)(function(_ref) {
	var _ref$size = _ref.size, size = _ref$size === void 0 ? "1em" : _ref$size, style = _ref.style, rest = _objectWithoutProperties$11(_ref, _excluded$11);
	return /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("svg", _objectSpread$11(_objectSpread$11({
		height: size,
		style: _objectSpread$11({
			flex: "none",
			lineHeight: 1
		}, style),
		viewBox: "0 0 24 24",
		width: size,
		xmlns: "http://www.w3.org/2000/svg"
	}, rest), {}, { children: [
		/* @__PURE__ */ (0, react_jsx_runtime.jsx)("title", { children: TITLE$11 }),
		/* @__PURE__ */ (0, react_jsx_runtime.jsx)("path", {
			d: "M23.197 4.503A6 6 0 0015 2.307a5.973 5.973 0 00-2.995 4.933l5.996.008v.515h-5.996c.039.937.298 1.87.8 2.74a6 6 0 1010.39-6z",
			fill: "#EF2CC1"
		}),
		/* @__PURE__ */ (0, react_jsx_runtime.jsx)("path", {
			d: "M.805 4.5A6 6 0 003 12.697a5.972 5.972 0 005.77.127L5.779 7.627l.446-.257 2.997 5.192A6 6 0 10.804 4.5z",
			fill: "#CAAEF5"
		}),
		/* @__PURE__ */ (0, react_jsx_runtime.jsx)("path", {
			d: "M12 23.894a6 6 0 005.999-6c0-2.13-1.1-3.996-2.775-5.06l-3.005 5.189-.444-.258 2.997-5.192A6 6 0 1012 23.894z",
			fill: "#FC4C02"
		})
	] }));
});
var Color_default$38 = Icon$11;

//#endregion
//#region node_modules/.pnpm/@lobehub+icons@5.16.0_@types+react@18.3.31_react@18.3.1/node_modules/@lobehub/icons/es/Vercel/style.js
var TITLE$10 = "Vercel";

//#endregion
//#region node_modules/.pnpm/@lobehub+icons@5.16.0_@types+react@18.3.31_react@18.3.1/node_modules/@lobehub/icons/es/Vercel/components/Mono.js
function _typeof$10(o) {
	"@babel/helpers - typeof";
	return _typeof$10 = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(o$1) {
		return typeof o$1;
	} : function(o$1) {
		return o$1 && "function" == typeof Symbol && o$1.constructor === Symbol && o$1 !== Symbol.prototype ? "symbol" : typeof o$1;
	}, _typeof$10(o);
}
var _excluded$10 = ["size", "style"];
function ownKeys$10(e, r) {
	var t = Object.keys(e);
	if (Object.getOwnPropertySymbols) {
		var o = Object.getOwnPropertySymbols(e);
		r && (o = o.filter(function(r$1) {
			return Object.getOwnPropertyDescriptor(e, r$1).enumerable;
		})), t.push.apply(t, o);
	}
	return t;
}
function _objectSpread$10(e) {
	for (var r = 1; r < arguments.length; r++) {
		var t = null != arguments[r] ? arguments[r] : {};
		r % 2 ? ownKeys$10(Object(t), !0).forEach(function(r$1) {
			_defineProperty$10(e, r$1, t[r$1]);
		}) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys$10(Object(t)).forEach(function(r$1) {
			Object.defineProperty(e, r$1, Object.getOwnPropertyDescriptor(t, r$1));
		});
	}
	return e;
}
function _defineProperty$10(obj, key, value) {
	key = _toPropertyKey$10(key);
	if (key in obj) Object.defineProperty(obj, key, {
		value,
		enumerable: true,
		configurable: true,
		writable: true
	});
	else obj[key] = value;
	return obj;
}
function _toPropertyKey$10(t) {
	var i = _toPrimitive$10(t, "string");
	return "symbol" == _typeof$10(i) ? i : String(i);
}
function _toPrimitive$10(t, r) {
	if ("object" != _typeof$10(t) || !t) return t;
	var e = t[Symbol.toPrimitive];
	if (void 0 !== e) {
		var i = e.call(t, r || "default");
		if ("object" != _typeof$10(i)) return i;
		throw new TypeError("@@toPrimitive must return a primitive value.");
	}
	return ("string" === r ? String : Number)(t);
}
function _objectWithoutProperties$10(source, excluded) {
	if (source == null) return {};
	var target = _objectWithoutPropertiesLoose$10(source, excluded);
	var key, i;
	if (Object.getOwnPropertySymbols) {
		var sourceSymbolKeys = Object.getOwnPropertySymbols(source);
		for (i = 0; i < sourceSymbolKeys.length; i++) {
			key = sourceSymbolKeys[i];
			if (excluded.indexOf(key) >= 0) continue;
			if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue;
			target[key] = source[key];
		}
	}
	return target;
}
function _objectWithoutPropertiesLoose$10(source, excluded) {
	if (source == null) return {};
	var target = {};
	var sourceKeys = Object.keys(source);
	var key, i;
	for (i = 0; i < sourceKeys.length; i++) {
		key = sourceKeys[i];
		if (excluded.indexOf(key) >= 0) continue;
		target[key] = source[key];
	}
	return target;
}
var Icon$10 = /* @__PURE__ */ (0, react.memo)(function(_ref) {
	var _ref$size = _ref.size, size = _ref$size === void 0 ? "1em" : _ref$size, style = _ref.style, rest = _objectWithoutProperties$10(_ref, _excluded$10);
	return /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("svg", _objectSpread$10(_objectSpread$10({
		fill: "currentColor",
		fillRule: "evenodd",
		height: size,
		style: _objectSpread$10({
			flex: "none",
			lineHeight: 1
		}, style),
		viewBox: "0 0 24 24",
		width: size,
		xmlns: "http://www.w3.org/2000/svg"
	}, rest), {}, { children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)("title", { children: TITLE$10 }), /* @__PURE__ */ (0, react_jsx_runtime.jsx)("path", { d: "M12 0l12 20.785H0L12 0z" })] }));
});
var Mono_default$13 = Icon$10;

//#endregion
//#region node_modules/.pnpm/@lobehub+icons@5.16.0_@types+react@18.3.31_react@18.3.1/node_modules/@lobehub/icons/es/VertexAI/style.js
var TITLE$9 = "VertexAI";

//#endregion
//#region node_modules/.pnpm/@lobehub+icons@5.16.0_@types+react@18.3.31_react@18.3.1/node_modules/@lobehub/icons/es/VertexAI/components/Color.js
function _typeof$9(o) {
	"@babel/helpers - typeof";
	return _typeof$9 = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(o$1) {
		return typeof o$1;
	} : function(o$1) {
		return o$1 && "function" == typeof Symbol && o$1.constructor === Symbol && o$1 !== Symbol.prototype ? "symbol" : typeof o$1;
	}, _typeof$9(o);
}
var _excluded$9 = ["size", "style"];
function ownKeys$9(e, r) {
	var t = Object.keys(e);
	if (Object.getOwnPropertySymbols) {
		var o = Object.getOwnPropertySymbols(e);
		r && (o = o.filter(function(r$1) {
			return Object.getOwnPropertyDescriptor(e, r$1).enumerable;
		})), t.push.apply(t, o);
	}
	return t;
}
function _objectSpread$9(e) {
	for (var r = 1; r < arguments.length; r++) {
		var t = null != arguments[r] ? arguments[r] : {};
		r % 2 ? ownKeys$9(Object(t), !0).forEach(function(r$1) {
			_defineProperty$9(e, r$1, t[r$1]);
		}) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys$9(Object(t)).forEach(function(r$1) {
			Object.defineProperty(e, r$1, Object.getOwnPropertyDescriptor(t, r$1));
		});
	}
	return e;
}
function _defineProperty$9(obj, key, value) {
	key = _toPropertyKey$9(key);
	if (key in obj) Object.defineProperty(obj, key, {
		value,
		enumerable: true,
		configurable: true,
		writable: true
	});
	else obj[key] = value;
	return obj;
}
function _toPropertyKey$9(t) {
	var i = _toPrimitive$9(t, "string");
	return "symbol" == _typeof$9(i) ? i : String(i);
}
function _toPrimitive$9(t, r) {
	if ("object" != _typeof$9(t) || !t) return t;
	var e = t[Symbol.toPrimitive];
	if (void 0 !== e) {
		var i = e.call(t, r || "default");
		if ("object" != _typeof$9(i)) return i;
		throw new TypeError("@@toPrimitive must return a primitive value.");
	}
	return ("string" === r ? String : Number)(t);
}
function _objectWithoutProperties$9(source, excluded) {
	if (source == null) return {};
	var target = _objectWithoutPropertiesLoose$9(source, excluded);
	var key, i;
	if (Object.getOwnPropertySymbols) {
		var sourceSymbolKeys = Object.getOwnPropertySymbols(source);
		for (i = 0; i < sourceSymbolKeys.length; i++) {
			key = sourceSymbolKeys[i];
			if (excluded.indexOf(key) >= 0) continue;
			if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue;
			target[key] = source[key];
		}
	}
	return target;
}
function _objectWithoutPropertiesLoose$9(source, excluded) {
	if (source == null) return {};
	var target = {};
	var sourceKeys = Object.keys(source);
	var key, i;
	for (i = 0; i < sourceKeys.length; i++) {
		key = sourceKeys[i];
		if (excluded.indexOf(key) >= 0) continue;
		target[key] = source[key];
	}
	return target;
}
var Icon$9 = /* @__PURE__ */ (0, react.memo)(function(_ref) {
	var _ref$size = _ref.size, size = _ref$size === void 0 ? "1em" : _ref$size, style = _ref.style, rest = _objectWithoutProperties$9(_ref, _excluded$9);
	return /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("svg", _objectSpread$9(_objectSpread$9({
		height: size,
		style: _objectSpread$9({
			flex: "none",
			lineHeight: 1
		}, style),
		viewBox: "0 0 24 24",
		width: size,
		xmlns: "http://www.w3.org/2000/svg"
	}, rest), {}, { children: [
		/* @__PURE__ */ (0, react_jsx_runtime.jsx)("title", { children: TITLE$9 }),
		/* @__PURE__ */ (0, react_jsx_runtime.jsx)("path", {
			d: "M11.995 20.216a1.892 1.892 0 100 3.785 1.892 1.892 0 000-3.785zm0 2.806a.927.927 0 11.927-.914.914.914 0 01-.927.914z",
			fill: "#4285F4"
		}),
		/* @__PURE__ */ (0, react_jsx_runtime.jsx)("path", {
			clipRule: "evenodd",
			d: "M21.687 14.144c.237.038.452.16.605.344a.978.978 0 01-.18 1.3l-8.24 6.082a1.892 1.892 0 00-1.147-1.508l8.28-6.08a.991.991 0 01.682-.138z",
			fill: "#669DF6",
			fillRule: "evenodd"
		}),
		/* @__PURE__ */ (0, react_jsx_runtime.jsx)("path", {
			clipRule: "evenodd",
			d: "M10.122 21.842l-8.217-6.066a.952.952 0 01-.206-1.287.978.978 0 011.287-.206l8.28 6.08a1.893 1.893 0 00-1.144 1.479z",
			fill: "#AECBFA",
			fillRule: "evenodd"
		}),
		/* @__PURE__ */ (0, react_jsx_runtime.jsx)("path", {
			d: "M4.273 4.475a.978.978 0 01-.965-.965V1.09a.978.978 0 111.943 0v2.42a.978.978 0 01-.978.965zM4.247 13.034a.978.978 0 100-1.956.978.978 0 000 1.956zM4.247 10.19a.978.978 0 100-1.956.978.978 0 000 1.956zM4.247 7.332a.978.978 0 100-1.956.978.978 0 000 1.956z",
			fill: "#AECBFA"
		}),
		/* @__PURE__ */ (0, react_jsx_runtime.jsx)("path", {
			d: "M19.718 7.307a.978.978 0 01-.965-.979v-2.42a.965.965 0 011.93 0v2.42a.964.964 0 01-.965.979zM19.743 13.047a.978.978 0 100-1.956.978.978 0 000 1.956zM19.743 10.151a.978.978 0 100-1.956.978.978 0 000 1.956zM19.743 2.068a.978.978 0 100-1.956.978.978 0 000 1.956z",
			fill: "#4285F4"
		}),
		/* @__PURE__ */ (0, react_jsx_runtime.jsx)("path", {
			d: "M11.995 15.917a.978.978 0 01-.965-.965v-2.459a.978.978 0 011.943 0v2.433a.976.976 0 01-.978.991zM11.995 18.762a.978.978 0 100-1.956.978.978 0 000 1.956zM11.995 10.64a.978.978 0 100-1.956.978.978 0 000 1.956zM11.995 7.783a.978.978 0 100-1.956.978.978 0 000 1.956z",
			fill: "#669DF6"
		}),
		/* @__PURE__ */ (0, react_jsx_runtime.jsx)("path", {
			d: "M15.856 10.177a.978.978 0 01-.965-.965v-2.42a.977.977 0 011.702-.763.979.979 0 01.241.763v2.42a.978.978 0 01-.978.965zM15.869 4.913a.978.978 0 100-1.956.978.978 0 000 1.956zM15.869 15.853a.978.978 0 100-1.956.978.978 0 000 1.956zM15.869 12.996a.978.978 0 100-1.956.978.978 0 000 1.956z",
			fill: "#4285F4"
		}),
		/* @__PURE__ */ (0, react_jsx_runtime.jsx)("path", {
			d: "M8.121 15.853a.978.978 0 100-1.956.978.978 0 000 1.956zM8.121 7.783a.978.978 0 100-1.956.978.978 0 000 1.956zM8.121 4.913a.978.978 0 100-1.957.978.978 0 000 1.957zM8.134 12.996a.978.978 0 01-.978-.94V9.611a.965.965 0 011.93 0v2.445a.966.966 0 01-.952.94z",
			fill: "#AECBFA"
		})
	] }));
});
var Color_default$39 = Icon$9;

//#endregion
//#region node_modules/.pnpm/@lobehub+icons@5.16.0_@types+react@18.3.31_react@18.3.1/node_modules/@lobehub/icons/es/Vllm/style.js
var TITLE$8 = "vLLM";

//#endregion
//#region node_modules/.pnpm/@lobehub+icons@5.16.0_@types+react@18.3.31_react@18.3.1/node_modules/@lobehub/icons/es/Vllm/components/Color.js
function _typeof$8(o) {
	"@babel/helpers - typeof";
	return _typeof$8 = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(o$1) {
		return typeof o$1;
	} : function(o$1) {
		return o$1 && "function" == typeof Symbol && o$1.constructor === Symbol && o$1 !== Symbol.prototype ? "symbol" : typeof o$1;
	}, _typeof$8(o);
}
var _excluded$8 = ["size", "style"];
function ownKeys$8(e, r) {
	var t = Object.keys(e);
	if (Object.getOwnPropertySymbols) {
		var o = Object.getOwnPropertySymbols(e);
		r && (o = o.filter(function(r$1) {
			return Object.getOwnPropertyDescriptor(e, r$1).enumerable;
		})), t.push.apply(t, o);
	}
	return t;
}
function _objectSpread$8(e) {
	for (var r = 1; r < arguments.length; r++) {
		var t = null != arguments[r] ? arguments[r] : {};
		r % 2 ? ownKeys$8(Object(t), !0).forEach(function(r$1) {
			_defineProperty$8(e, r$1, t[r$1]);
		}) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys$8(Object(t)).forEach(function(r$1) {
			Object.defineProperty(e, r$1, Object.getOwnPropertyDescriptor(t, r$1));
		});
	}
	return e;
}
function _defineProperty$8(obj, key, value) {
	key = _toPropertyKey$8(key);
	if (key in obj) Object.defineProperty(obj, key, {
		value,
		enumerable: true,
		configurable: true,
		writable: true
	});
	else obj[key] = value;
	return obj;
}
function _toPropertyKey$8(t) {
	var i = _toPrimitive$8(t, "string");
	return "symbol" == _typeof$8(i) ? i : String(i);
}
function _toPrimitive$8(t, r) {
	if ("object" != _typeof$8(t) || !t) return t;
	var e = t[Symbol.toPrimitive];
	if (void 0 !== e) {
		var i = e.call(t, r || "default");
		if ("object" != _typeof$8(i)) return i;
		throw new TypeError("@@toPrimitive must return a primitive value.");
	}
	return ("string" === r ? String : Number)(t);
}
function _objectWithoutProperties$8(source, excluded) {
	if (source == null) return {};
	var target = _objectWithoutPropertiesLoose$8(source, excluded);
	var key, i;
	if (Object.getOwnPropertySymbols) {
		var sourceSymbolKeys = Object.getOwnPropertySymbols(source);
		for (i = 0; i < sourceSymbolKeys.length; i++) {
			key = sourceSymbolKeys[i];
			if (excluded.indexOf(key) >= 0) continue;
			if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue;
			target[key] = source[key];
		}
	}
	return target;
}
function _objectWithoutPropertiesLoose$8(source, excluded) {
	if (source == null) return {};
	var target = {};
	var sourceKeys = Object.keys(source);
	var key, i;
	for (i = 0; i < sourceKeys.length; i++) {
		key = sourceKeys[i];
		if (excluded.indexOf(key) >= 0) continue;
		target[key] = source[key];
	}
	return target;
}
var Icon$8 = /* @__PURE__ */ (0, react.memo)(function(_ref) {
	var _ref$size = _ref.size, size = _ref$size === void 0 ? "1em" : _ref$size, style = _ref.style, rest = _objectWithoutProperties$8(_ref, _excluded$8);
	return /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("svg", _objectSpread$8(_objectSpread$8({
		height: size,
		style: _objectSpread$8({
			flex: "none",
			lineHeight: 1
		}, style),
		viewBox: "0 0 24 24",
		width: size,
		xmlns: "http://www.w3.org/2000/svg"
	}, rest), {}, { children: [
		/* @__PURE__ */ (0, react_jsx_runtime.jsx)("title", { children: TITLE$8 }),
		/* @__PURE__ */ (0, react_jsx_runtime.jsx)("path", {
			d: "M0 4.973h9.324V23L0 4.973z",
			fill: "#FDB515"
		}),
		/* @__PURE__ */ (0, react_jsx_runtime.jsx)("path", {
			d: "M13.986 4.351L22.378 0l-6.216 23H9.324l4.662-18.649z",
			fill: "#30A2FF"
		})
	] }));
});
var Color_default$40 = Icon$8;

//#endregion
//#region node_modules/.pnpm/@lobehub+icons@5.16.0_@types+react@18.3.31_react@18.3.1/node_modules/@lobehub/icons/es/Volcengine/style.js
var TITLE$7 = "Volcengine";

//#endregion
//#region node_modules/.pnpm/@lobehub+icons@5.16.0_@types+react@18.3.31_react@18.3.1/node_modules/@lobehub/icons/es/Volcengine/components/Color.js
function _typeof$7(o) {
	"@babel/helpers - typeof";
	return _typeof$7 = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(o$1) {
		return typeof o$1;
	} : function(o$1) {
		return o$1 && "function" == typeof Symbol && o$1.constructor === Symbol && o$1 !== Symbol.prototype ? "symbol" : typeof o$1;
	}, _typeof$7(o);
}
var _excluded$7 = ["size", "style"];
function ownKeys$7(e, r) {
	var t = Object.keys(e);
	if (Object.getOwnPropertySymbols) {
		var o = Object.getOwnPropertySymbols(e);
		r && (o = o.filter(function(r$1) {
			return Object.getOwnPropertyDescriptor(e, r$1).enumerable;
		})), t.push.apply(t, o);
	}
	return t;
}
function _objectSpread$7(e) {
	for (var r = 1; r < arguments.length; r++) {
		var t = null != arguments[r] ? arguments[r] : {};
		r % 2 ? ownKeys$7(Object(t), !0).forEach(function(r$1) {
			_defineProperty$7(e, r$1, t[r$1]);
		}) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys$7(Object(t)).forEach(function(r$1) {
			Object.defineProperty(e, r$1, Object.getOwnPropertyDescriptor(t, r$1));
		});
	}
	return e;
}
function _defineProperty$7(obj, key, value) {
	key = _toPropertyKey$7(key);
	if (key in obj) Object.defineProperty(obj, key, {
		value,
		enumerable: true,
		configurable: true,
		writable: true
	});
	else obj[key] = value;
	return obj;
}
function _toPropertyKey$7(t) {
	var i = _toPrimitive$7(t, "string");
	return "symbol" == _typeof$7(i) ? i : String(i);
}
function _toPrimitive$7(t, r) {
	if ("object" != _typeof$7(t) || !t) return t;
	var e = t[Symbol.toPrimitive];
	if (void 0 !== e) {
		var i = e.call(t, r || "default");
		if ("object" != _typeof$7(i)) return i;
		throw new TypeError("@@toPrimitive must return a primitive value.");
	}
	return ("string" === r ? String : Number)(t);
}
function _objectWithoutProperties$7(source, excluded) {
	if (source == null) return {};
	var target = _objectWithoutPropertiesLoose$7(source, excluded);
	var key, i;
	if (Object.getOwnPropertySymbols) {
		var sourceSymbolKeys = Object.getOwnPropertySymbols(source);
		for (i = 0; i < sourceSymbolKeys.length; i++) {
			key = sourceSymbolKeys[i];
			if (excluded.indexOf(key) >= 0) continue;
			if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue;
			target[key] = source[key];
		}
	}
	return target;
}
function _objectWithoutPropertiesLoose$7(source, excluded) {
	if (source == null) return {};
	var target = {};
	var sourceKeys = Object.keys(source);
	var key, i;
	for (i = 0; i < sourceKeys.length; i++) {
		key = sourceKeys[i];
		if (excluded.indexOf(key) >= 0) continue;
		target[key] = source[key];
	}
	return target;
}
var Icon$7 = /* @__PURE__ */ (0, react.memo)(function(_ref) {
	var _ref$size = _ref.size, size = _ref$size === void 0 ? "1em" : _ref$size, style = _ref.style, rest = _objectWithoutProperties$7(_ref, _excluded$7);
	return /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("svg", _objectSpread$7(_objectSpread$7({
		height: size,
		style: _objectSpread$7({
			flex: "none",
			lineHeight: 1
		}, style),
		viewBox: "0 0 24 24",
		width: size,
		xmlns: "http://www.w3.org/2000/svg"
	}, rest), {}, { children: [
		/* @__PURE__ */ (0, react_jsx_runtime.jsx)("title", { children: TITLE$7 }),
		/* @__PURE__ */ (0, react_jsx_runtime.jsx)("path", {
			d: "M19.44 10.153l-2.936 11.586a.215.215 0 00.214.261h5.87a.215.215 0 00.214-.261l-2.95-11.586a.214.214 0 00-.412 0zM3.28 12.778l-2.275 8.96A.214.214 0 001.22 22h4.532a.212.212 0 00.214-.165.214.214 0 000-.097l-2.276-8.96a.214.214 0 00-.41 0z",
			fill: "#00E5E5"
		}),
		/* @__PURE__ */ (0, react_jsx_runtime.jsx)("path", {
			d: "M7.29 5.359L3.148 21.738a.215.215 0 00.203.261h8.29a.214.214 0 00.215-.261L7.7 5.358a.214.214 0 00-.41 0z",
			fill: "#006EFF"
		}),
		/* @__PURE__ */ (0, react_jsx_runtime.jsx)("path", {
			d: "M14.44.15a.214.214 0 00-.41 0L8.366 21.739a.214.214 0 00.214.261H19.9a.216.216 0 00.171-.078.214.214 0 00.044-.183L14.439.15z",
			fill: "#006EFF"
		}),
		/* @__PURE__ */ (0, react_jsx_runtime.jsx)("path", {
			d: "M10.278 7.741L6.685 21.736a.214.214 0 00.214.264h7.17a.215.215 0 00.214-.264L10.688 7.741a.214.214 0 00-.41 0z",
			fill: "#00E5E5"
		})
	] }));
});
var Color_default$41 = Icon$7;

//#endregion
//#region node_modules/.pnpm/@lobehub+icons@5.16.0_@types+react@18.3.31_react@18.3.1/node_modules/@lobehub/icons/es/Wenxin/style.js
var TITLE$6 = "Wenxin";

//#endregion
//#region node_modules/.pnpm/@lobehub+icons@5.16.0_@types+react@18.3.31_react@18.3.1/node_modules/@lobehub/icons/es/Wenxin/components/Color.js
function _typeof$6(o) {
	"@babel/helpers - typeof";
	return _typeof$6 = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(o$1) {
		return typeof o$1;
	} : function(o$1) {
		return o$1 && "function" == typeof Symbol && o$1.constructor === Symbol && o$1 !== Symbol.prototype ? "symbol" : typeof o$1;
	}, _typeof$6(o);
}
var _excluded$6 = ["size", "style"];
function ownKeys$6(e, r) {
	var t = Object.keys(e);
	if (Object.getOwnPropertySymbols) {
		var o = Object.getOwnPropertySymbols(e);
		r && (o = o.filter(function(r$1) {
			return Object.getOwnPropertyDescriptor(e, r$1).enumerable;
		})), t.push.apply(t, o);
	}
	return t;
}
function _objectSpread$6(e) {
	for (var r = 1; r < arguments.length; r++) {
		var t = null != arguments[r] ? arguments[r] : {};
		r % 2 ? ownKeys$6(Object(t), !0).forEach(function(r$1) {
			_defineProperty$6(e, r$1, t[r$1]);
		}) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys$6(Object(t)).forEach(function(r$1) {
			Object.defineProperty(e, r$1, Object.getOwnPropertyDescriptor(t, r$1));
		});
	}
	return e;
}
function _defineProperty$6(obj, key, value) {
	key = _toPropertyKey$6(key);
	if (key in obj) Object.defineProperty(obj, key, {
		value,
		enumerable: true,
		configurable: true,
		writable: true
	});
	else obj[key] = value;
	return obj;
}
function _toPropertyKey$6(t) {
	var i = _toPrimitive$6(t, "string");
	return "symbol" == _typeof$6(i) ? i : String(i);
}
function _toPrimitive$6(t, r) {
	if ("object" != _typeof$6(t) || !t) return t;
	var e = t[Symbol.toPrimitive];
	if (void 0 !== e) {
		var i = e.call(t, r || "default");
		if ("object" != _typeof$6(i)) return i;
		throw new TypeError("@@toPrimitive must return a primitive value.");
	}
	return ("string" === r ? String : Number)(t);
}
function _objectWithoutProperties$6(source, excluded) {
	if (source == null) return {};
	var target = _objectWithoutPropertiesLoose$6(source, excluded);
	var key, i;
	if (Object.getOwnPropertySymbols) {
		var sourceSymbolKeys = Object.getOwnPropertySymbols(source);
		for (i = 0; i < sourceSymbolKeys.length; i++) {
			key = sourceSymbolKeys[i];
			if (excluded.indexOf(key) >= 0) continue;
			if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue;
			target[key] = source[key];
		}
	}
	return target;
}
function _objectWithoutPropertiesLoose$6(source, excluded) {
	if (source == null) return {};
	var target = {};
	var sourceKeys = Object.keys(source);
	var key, i;
	for (i = 0; i < sourceKeys.length; i++) {
		key = sourceKeys[i];
		if (excluded.indexOf(key) >= 0) continue;
		target[key] = source[key];
	}
	return target;
}
var Icon$6 = /* @__PURE__ */ (0, react.memo)(function(_ref) {
	var _ref$size = _ref.size, size = _ref$size === void 0 ? "1em" : _ref$size, style = _ref.style, rest = _objectWithoutProperties$6(_ref, _excluded$6);
	var _useFillId = useFillId(TITLE$6), id = _useFillId.id, fill = _useFillId.fill;
	return /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("svg", _objectSpread$6(_objectSpread$6({
		height: size,
		style: _objectSpread$6({
			flex: "none",
			lineHeight: 1
		}, style),
		viewBox: "0 0 24 24",
		width: size,
		xmlns: "http://www.w3.org/2000/svg"
	}, rest), {}, { children: [
		/* @__PURE__ */ (0, react_jsx_runtime.jsx)("title", { children: TITLE$6 }),
		/* @__PURE__ */ (0, react_jsx_runtime.jsx)("path", {
			d: "M11.32 1.176a1.4 1.4 0 011.36 0l8.64 4.843c.421.234.68.67.68 1.141v9.68c0 .472-.259.908-.68 1.143l-8.64 4.84a1.4 1.4 0 01-1.36 0l-8.64-4.84A1.31 1.31 0 012 16.84V7.159c0-.471.259-.907.68-1.142l8.64-4.84zm7.42 13.839V8.227L12.002 12 12 19.551l6.059-3.394a1.31 1.31 0 00.68-1.142zM12.68 4.833a1.393 1.393 0 00-1.36 0L5.944 7.846c-.421.235-.68.67-.68 1.142v6.027c0 .47.259.905.68 1.142l2.795 1.566V11.09a1.546 1.546 0 00.221.79 1.527 1.527 0 01-.216-.834l.004-.094.02-.15.018-.084.017-.062.039-.117.062-.142.035-.065.081-.13.094-.122.084-.091.08-.075.125-.1.071-.048.134-.076 5.87-3.29-2.796-1.566z",
			fill
		}),
		/* @__PURE__ */ (0, react_jsx_runtime.jsx)("path", {
			d: "M12 11.088c0-.875-.73-1.584-1.631-1.584a1.66 1.66 0 00-.855.237c-.027.016-.055.033-.08.05a2.361 2.361 0 00-.123.093c-.022.02-.045.038-.066.059l-.048.045-.063.067c-.014.016-.028.031-.04.048a2.303 2.303 0 00-.094.125l-.042.069a1.7 1.7 0 00-.07.13l-.036.081a.764.764 0 00-.022.06c-.01.03-.02.058-.028.087l-.017.062a.883.883 0 00-.03.16c-.002.025-.007.05-.008.074a1.527 1.527 0 00.213.929c.302.508.85.792 1.414.792.277 0 .558-.068.814-.212l.815-.457v-.914L12 11.088z",
			fill: "#012F8D"
		}),
		/* @__PURE__ */ (0, react_jsx_runtime.jsx)("defs", { children: /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("linearGradient", {
			id,
			x1: "9.155%",
			x2: "90.531%",
			y1: "75.177%",
			y2: "25.028%",
			children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)("stop", {
				offset: "0%",
				stopColor: "#0A51C3"
			}), /* @__PURE__ */ (0, react_jsx_runtime.jsx)("stop", {
				offset: "100%",
				stopColor: "#23A4FB"
			})]
		}) })
	] }));
});
var Color_default$42 = Icon$6;

//#endregion
//#region node_modules/.pnpm/@lobehub+icons@5.16.0_@types+react@18.3.31_react@18.3.1/node_modules/@lobehub/icons/es/XAI/style.js
var TITLE$5 = "Grok";

//#endregion
//#region node_modules/.pnpm/@lobehub+icons@5.16.0_@types+react@18.3.31_react@18.3.1/node_modules/@lobehub/icons/es/XAI/components/Mono.js
function _typeof$5(o) {
	"@babel/helpers - typeof";
	return _typeof$5 = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(o$1) {
		return typeof o$1;
	} : function(o$1) {
		return o$1 && "function" == typeof Symbol && o$1.constructor === Symbol && o$1 !== Symbol.prototype ? "symbol" : typeof o$1;
	}, _typeof$5(o);
}
var _excluded$5 = ["size", "style"];
function ownKeys$5(e, r) {
	var t = Object.keys(e);
	if (Object.getOwnPropertySymbols) {
		var o = Object.getOwnPropertySymbols(e);
		r && (o = o.filter(function(r$1) {
			return Object.getOwnPropertyDescriptor(e, r$1).enumerable;
		})), t.push.apply(t, o);
	}
	return t;
}
function _objectSpread$5(e) {
	for (var r = 1; r < arguments.length; r++) {
		var t = null != arguments[r] ? arguments[r] : {};
		r % 2 ? ownKeys$5(Object(t), !0).forEach(function(r$1) {
			_defineProperty$5(e, r$1, t[r$1]);
		}) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys$5(Object(t)).forEach(function(r$1) {
			Object.defineProperty(e, r$1, Object.getOwnPropertyDescriptor(t, r$1));
		});
	}
	return e;
}
function _defineProperty$5(obj, key, value) {
	key = _toPropertyKey$5(key);
	if (key in obj) Object.defineProperty(obj, key, {
		value,
		enumerable: true,
		configurable: true,
		writable: true
	});
	else obj[key] = value;
	return obj;
}
function _toPropertyKey$5(t) {
	var i = _toPrimitive$5(t, "string");
	return "symbol" == _typeof$5(i) ? i : String(i);
}
function _toPrimitive$5(t, r) {
	if ("object" != _typeof$5(t) || !t) return t;
	var e = t[Symbol.toPrimitive];
	if (void 0 !== e) {
		var i = e.call(t, r || "default");
		if ("object" != _typeof$5(i)) return i;
		throw new TypeError("@@toPrimitive must return a primitive value.");
	}
	return ("string" === r ? String : Number)(t);
}
function _objectWithoutProperties$5(source, excluded) {
	if (source == null) return {};
	var target = _objectWithoutPropertiesLoose$5(source, excluded);
	var key, i;
	if (Object.getOwnPropertySymbols) {
		var sourceSymbolKeys = Object.getOwnPropertySymbols(source);
		for (i = 0; i < sourceSymbolKeys.length; i++) {
			key = sourceSymbolKeys[i];
			if (excluded.indexOf(key) >= 0) continue;
			if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue;
			target[key] = source[key];
		}
	}
	return target;
}
function _objectWithoutPropertiesLoose$5(source, excluded) {
	if (source == null) return {};
	var target = {};
	var sourceKeys = Object.keys(source);
	var key, i;
	for (i = 0; i < sourceKeys.length; i++) {
		key = sourceKeys[i];
		if (excluded.indexOf(key) >= 0) continue;
		target[key] = source[key];
	}
	return target;
}
var Icon$5 = /* @__PURE__ */ (0, react.memo)(function(_ref) {
	var _ref$size = _ref.size, size = _ref$size === void 0 ? "1em" : _ref$size, style = _ref.style, rest = _objectWithoutProperties$5(_ref, _excluded$5);
	return /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("svg", _objectSpread$5(_objectSpread$5({
		fill: "currentColor",
		fillRule: "evenodd",
		height: size,
		style: _objectSpread$5({
			flex: "none",
			lineHeight: 1
		}, style),
		viewBox: "0 0 24 24",
		width: size,
		xmlns: "http://www.w3.org/2000/svg"
	}, rest), {}, { children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)("title", { children: TITLE$5 }), /* @__PURE__ */ (0, react_jsx_runtime.jsx)("path", { d: "M6.469 8.776L16.512 23h-4.464L2.005 8.776H6.47zm-.004 7.9l2.233 3.164L6.467 23H2l4.465-6.324zM22 2.582V23h-3.659V7.764L22 2.582zM22 1l-9.952 14.095-2.233-3.163L17.533 1H22z" })] }));
});
var Mono_default$14 = Icon$5;

//#endregion
//#region node_modules/.pnpm/@lobehub+icons@5.16.0_@types+react@18.3.31_react@18.3.1/node_modules/@lobehub/icons/es/XiaomiMiMo/style.js
var TITLE$4 = "XiaomiMiMo";

//#endregion
//#region node_modules/.pnpm/@lobehub+icons@5.16.0_@types+react@18.3.31_react@18.3.1/node_modules/@lobehub/icons/es/XiaomiMiMo/components/Mono.js
function _typeof$4(o) {
	"@babel/helpers - typeof";
	return _typeof$4 = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(o$1) {
		return typeof o$1;
	} : function(o$1) {
		return o$1 && "function" == typeof Symbol && o$1.constructor === Symbol && o$1 !== Symbol.prototype ? "symbol" : typeof o$1;
	}, _typeof$4(o);
}
var _excluded$4 = ["size", "style"];
function ownKeys$4(e, r) {
	var t = Object.keys(e);
	if (Object.getOwnPropertySymbols) {
		var o = Object.getOwnPropertySymbols(e);
		r && (o = o.filter(function(r$1) {
			return Object.getOwnPropertyDescriptor(e, r$1).enumerable;
		})), t.push.apply(t, o);
	}
	return t;
}
function _objectSpread$4(e) {
	for (var r = 1; r < arguments.length; r++) {
		var t = null != arguments[r] ? arguments[r] : {};
		r % 2 ? ownKeys$4(Object(t), !0).forEach(function(r$1) {
			_defineProperty$4(e, r$1, t[r$1]);
		}) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys$4(Object(t)).forEach(function(r$1) {
			Object.defineProperty(e, r$1, Object.getOwnPropertyDescriptor(t, r$1));
		});
	}
	return e;
}
function _defineProperty$4(obj, key, value) {
	key = _toPropertyKey$4(key);
	if (key in obj) Object.defineProperty(obj, key, {
		value,
		enumerable: true,
		configurable: true,
		writable: true
	});
	else obj[key] = value;
	return obj;
}
function _toPropertyKey$4(t) {
	var i = _toPrimitive$4(t, "string");
	return "symbol" == _typeof$4(i) ? i : String(i);
}
function _toPrimitive$4(t, r) {
	if ("object" != _typeof$4(t) || !t) return t;
	var e = t[Symbol.toPrimitive];
	if (void 0 !== e) {
		var i = e.call(t, r || "default");
		if ("object" != _typeof$4(i)) return i;
		throw new TypeError("@@toPrimitive must return a primitive value.");
	}
	return ("string" === r ? String : Number)(t);
}
function _objectWithoutProperties$4(source, excluded) {
	if (source == null) return {};
	var target = _objectWithoutPropertiesLoose$4(source, excluded);
	var key, i;
	if (Object.getOwnPropertySymbols) {
		var sourceSymbolKeys = Object.getOwnPropertySymbols(source);
		for (i = 0; i < sourceSymbolKeys.length; i++) {
			key = sourceSymbolKeys[i];
			if (excluded.indexOf(key) >= 0) continue;
			if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue;
			target[key] = source[key];
		}
	}
	return target;
}
function _objectWithoutPropertiesLoose$4(source, excluded) {
	if (source == null) return {};
	var target = {};
	var sourceKeys = Object.keys(source);
	var key, i;
	for (i = 0; i < sourceKeys.length; i++) {
		key = sourceKeys[i];
		if (excluded.indexOf(key) >= 0) continue;
		target[key] = source[key];
	}
	return target;
}
var Icon$4 = /* @__PURE__ */ (0, react.memo)(function(_ref) {
	var _ref$size = _ref.size, size = _ref$size === void 0 ? "1em" : _ref$size, style = _ref.style, rest = _objectWithoutProperties$4(_ref, _excluded$4);
	return /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("svg", _objectSpread$4(_objectSpread$4({
		fill: "currentColor",
		fillRule: "evenodd",
		height: size,
		style: _objectSpread$4({
			flex: "none",
			lineHeight: 1
		}, style),
		viewBox: "0 0 24 24",
		width: size,
		xmlns: "http://www.w3.org/2000/svg"
	}, rest), {}, { children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)("title", { children: TITLE$4 }), /* @__PURE__ */ (0, react_jsx_runtime.jsx)("path", { d: "M.958 15.936a.459.459 0 01.459.44v2.729a.46.46 0 01-.918 0v-2.729a.459.459 0 01.459-.44zm4.814-2.035a.46.46 0 01.553.45v4.754a.458.458 0 11-.918 0V15.48L3.74 17.202a.462.462 0 01-.655.016.462.462 0 01-.065-.082L.628 14.67a.459.459 0 01.658-.637l2.124 2.187 2.127-2.188a.46.46 0 01.235-.13zm2.068.004a.46.46 0 01.458.445v4.755a.46.46 0 01-.458.458.459.459 0 01-.458-.458V14.35a.459.459 0 01.458-.445zm1.973 2.014a.46.46 0 01.46.457v2.729a.46.46 0 01-.784.324.46.46 0 01-.134-.324v-2.729a.46.46 0 01.458-.458zm.002-2.045a.458.458 0 01.328.157l2.127 2.19 2.125-2.19a.459.459 0 01.784.318v4.756a.46.46 0 01-.455.458.46.46 0 01-.458-.458V15.48l-1.667 1.723a.46.46 0 01-.65.008l-.005-.005c0-.002-.002-.002-.004-.003l-2.455-2.534a.46.46 0 01-.008-.667.461.461 0 01.338-.128zm6.797 1.206a.46.46 0 01.53.651A1.966 1.966 0 0019.81 18.4a.462.462 0 01.623.18.46.46 0 01-.181.624 2.863 2.863 0 01-1.38.353l-.142-.004a2.88 2.88 0 01-2.393-4.263.461.461 0 01.274-.21zm.864-.931a2.884 2.884 0 013.915 3.914.46.46 0 01-.402.24l-.057-.004a.458.458 0 01-.164-.055.46.46 0 01-.182-.622 1.967 1.967 0 00-2.669-2.67.459.459 0 11-.441-.803zM9.59 6.368c1.481 0 1.696 1.202 1.696 1.654v2.648h-.917v-.432c-.26.346-.792.535-1.36.535-.133 0-1.289-.03-1.384-1.136-.082-.932.675-1.61 2.053-1.61h.691c0-.563-.367-.886-.983-.886-.44.013-.864.174-1.2.458l-.36-.664c.484-.379 1.012-.567 1.764-.567zm4.427.1c1.263 0 2.082.97 2.083 2.15 0 1.181-.824 2.154-2.083 2.154-1.26 0-2.084-.972-2.084-2.152 0-1.18.82-2.153 2.084-2.153zm6.801.015c.68 0 1.202.465 1.197 1.548v2.642H21.1V8.29c0-.312-.002-.98-.63-.98s-.628.667-.628.838v2.524h-.89V8.148c0-.17-.001-.838-.63-.838-.628 0-.628.668-.628.98v2.383h-.917v-4.03h.917V7a1.22 1.22 0 01.947-.516c.398 0 .76.193.982.686a1.321 1.321 0 011.195-.686zm-18.093.872l1.457-1.772H5.32L3.311 8.07l2.14 2.602H4.24L2.725 8.796 1.21 10.672H0L2.138 8.07.13 5.583h1.138l1.458 1.772zm4.149 3.317h-.916V6.644h.916v4.028zm16.99 0h-.916V6.644h.916v4.028zM9.925 8.71c-1.055 0-1.359.412-1.326.742.032.329.324.537.757.537a1.013 1.013 0 001.014-.968l.002-.31h-.447zM14.018 7.3c-.663 0-1.184.487-1.184 1.32 0 .832.52 1.32 1.184 1.32.662 0 1.182-.49 1.182-1.32 0-.832-.52-1.32-1.182-1.32zM6.417 5.001a.568.568 0 01.587.582.588.588 0 01-1.175 0A.57.57 0 016.417 5zm16.991 0a.57.57 0 01.592.582.588.588 0 01-1.174 0 .57.57 0 01.357-.542.572.572 0 01.225-.04z" })] }));
});
var Mono_default$15 = Icon$4;

//#endregion
//#region node_modules/.pnpm/@lobehub+icons@5.16.0_@types+react@18.3.31_react@18.3.1/node_modules/@lobehub/icons/es/Xinference/style.js
var TITLE$3 = "Xinference";

//#endregion
//#region node_modules/.pnpm/@lobehub+icons@5.16.0_@types+react@18.3.31_react@18.3.1/node_modules/@lobehub/icons/es/Xinference/components/Color.js
function _typeof$3(o) {
	"@babel/helpers - typeof";
	return _typeof$3 = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(o$1) {
		return typeof o$1;
	} : function(o$1) {
		return o$1 && "function" == typeof Symbol && o$1.constructor === Symbol && o$1 !== Symbol.prototype ? "symbol" : typeof o$1;
	}, _typeof$3(o);
}
var _excluded$3 = ["size", "style"];
function ownKeys$3(e, r) {
	var t = Object.keys(e);
	if (Object.getOwnPropertySymbols) {
		var o = Object.getOwnPropertySymbols(e);
		r && (o = o.filter(function(r$1) {
			return Object.getOwnPropertyDescriptor(e, r$1).enumerable;
		})), t.push.apply(t, o);
	}
	return t;
}
function _objectSpread$3(e) {
	for (var r = 1; r < arguments.length; r++) {
		var t = null != arguments[r] ? arguments[r] : {};
		r % 2 ? ownKeys$3(Object(t), !0).forEach(function(r$1) {
			_defineProperty$3(e, r$1, t[r$1]);
		}) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys$3(Object(t)).forEach(function(r$1) {
			Object.defineProperty(e, r$1, Object.getOwnPropertyDescriptor(t, r$1));
		});
	}
	return e;
}
function _defineProperty$3(obj, key, value) {
	key = _toPropertyKey$3(key);
	if (key in obj) Object.defineProperty(obj, key, {
		value,
		enumerable: true,
		configurable: true,
		writable: true
	});
	else obj[key] = value;
	return obj;
}
function _toPropertyKey$3(t) {
	var i = _toPrimitive$3(t, "string");
	return "symbol" == _typeof$3(i) ? i : String(i);
}
function _toPrimitive$3(t, r) {
	if ("object" != _typeof$3(t) || !t) return t;
	var e = t[Symbol.toPrimitive];
	if (void 0 !== e) {
		var i = e.call(t, r || "default");
		if ("object" != _typeof$3(i)) return i;
		throw new TypeError("@@toPrimitive must return a primitive value.");
	}
	return ("string" === r ? String : Number)(t);
}
function _slicedToArray(arr, i) {
	return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest();
}
function _nonIterableRest() {
	throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}
function _unsupportedIterableToArray(o, minLen) {
	if (!o) return;
	if (typeof o === "string") return _arrayLikeToArray(o, minLen);
	var n = Object.prototype.toString.call(o).slice(8, -1);
	if (n === "Object" && o.constructor) n = o.constructor.name;
	if (n === "Map" || n === "Set") return Array.from(o);
	if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen);
}
function _arrayLikeToArray(arr, len) {
	if (len == null || len > arr.length) len = arr.length;
	for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i];
	return arr2;
}
function _iterableToArrayLimit(r, l) {
	var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"];
	if (null != t) {
		var e, n, i, u, a = [], f = !0, o = !1;
		try {
			if (i = (t = t.call(r)).next, 0 === l) {
				if (Object(t) !== t) return;
				f = !1;
			} else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0);
		} catch (r$1) {
			o = !0, n = r$1;
		} finally {
			try {
				if (!f && null != t.return && (u = t.return(), Object(u) !== u)) return;
			} finally {
				if (o) throw n;
			}
		}
		return a;
	}
}
function _arrayWithHoles(arr) {
	if (Array.isArray(arr)) return arr;
}
function _objectWithoutProperties$3(source, excluded) {
	if (source == null) return {};
	var target = _objectWithoutPropertiesLoose$3(source, excluded);
	var key, i;
	if (Object.getOwnPropertySymbols) {
		var sourceSymbolKeys = Object.getOwnPropertySymbols(source);
		for (i = 0; i < sourceSymbolKeys.length; i++) {
			key = sourceSymbolKeys[i];
			if (excluded.indexOf(key) >= 0) continue;
			if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue;
			target[key] = source[key];
		}
	}
	return target;
}
function _objectWithoutPropertiesLoose$3(source, excluded) {
	if (source == null) return {};
	var target = {};
	var sourceKeys = Object.keys(source);
	var key, i;
	for (i = 0; i < sourceKeys.length; i++) {
		key = sourceKeys[i];
		if (excluded.indexOf(key) >= 0) continue;
		target[key] = source[key];
	}
	return target;
}
var Icon$3 = /* @__PURE__ */ (0, react.memo)(function(_ref) {
	var _ref$size = _ref.size, size = _ref$size === void 0 ? "1em" : _ref$size, style = _ref.style, rest = _objectWithoutProperties$3(_ref, _excluded$3);
	var _useFillIds2 = _slicedToArray(useFillIds(TITLE$3, 3), 3), a = _useFillIds2[0], b = _useFillIds2[1], c = _useFillIds2[2];
	return /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("svg", _objectSpread$3(_objectSpread$3({
		height: size,
		style: _objectSpread$3({
			flex: "none",
			lineHeight: 1
		}, style),
		viewBox: "0 0 24 24",
		width: size,
		xmlns: "http://www.w3.org/2000/svg"
	}, rest), {}, { children: [
		/* @__PURE__ */ (0, react_jsx_runtime.jsx)("title", { children: TITLE$3 }),
		/* @__PURE__ */ (0, react_jsx_runtime.jsx)("path", {
			d: "M5.223 9.692c.652 1.795 1.925 3.376 3.396 4.573 1.482 1.229 3.254 2.17 5.122 2.653a9.99 9.99 0 002.033.302c1.302.05 2.713-.206 3.758-1.04 1.297-1.036 1.651-2.625 1.318-4.21-.209-.993-.641-1.93-1.205-2.787a10.284 10.284 0 00-.366-.525.008.008 0 01.005-.007h.004c.002 0 .004 0 .006.002l.394.405a17.227 17.227 0 012.484 3.262c.579.993 1.023 2.046 1.255 3.144.369 1.747.07 3.546-1.306 4.777-.724.648-1.655 1.041-2.59 1.235-1.297.267-2.649.228-3.965.007-.669-.112-1.315-.26-1.937-.443-2.576-.756-5.012-2.051-7.143-3.677a20.968 20.968 0 01-3.484-3.296C1.949 12.813 1.046 11.396.487 9.853.12 8.845-.087 7.725.035 6.663c.267-2.306 1.98-3.654 4.174-4.06 1.265-.234 2.594-.186 3.879.037a17.71 17.71 0 013.978 1.192v.004a.006.006 0 01-.004.004h-.004a8.907 8.907 0 00-2.869-.29c-.807.048-1.666.263-2.357.656-1.034.588-1.67 1.463-1.907 2.625a4.567 4.567 0 00-.069 1.1c.025.58.163 1.198.367 1.761z",
			fill: a.fill
		}),
		/* @__PURE__ */ (0, react_jsx_runtime.jsx)("path", {
			d: "M18.02 7.235a.05.05 0 01-.007.03c-.461.916-.923 1.832-1.386 2.747-.424.837-.745 1.437-.965 1.8a17.877 17.877 0 01-2.98 3.707.027.027 0 01-.03.005 12.678 12.678 0 01-4.205-2.777c-.14-.14-.28-.288-.42-.447a.024.024 0 01-.005-.013c0-.005 0-.01.003-.014a17.718 17.718 0 011.68-2.379 18.27 18.27 0 012.7-2.606c.408-.32 1.39-1.094 2.95-2.323L21.652.002a.008.008 0 01.01 0 .01.01 0 01.004.005.01.01 0 010 .006l-3.648 7.222z",
			fill: b.fill
		}),
		/* @__PURE__ */ (0, react_jsx_runtime.jsx)("path", {
			d: "M2.027 24c.002 0 .004 0 .005-.002l5.843-4.58a.02.02 0 00.008-.017.02.02 0 00-.01-.016 26.743 26.743 0 01-2.584-1.842h-.006a.014.014 0 00-.005.002.012.012 0 00-.004.005L2.02 23.987a.01.01 0 000 .006c0 .002 0 .004.002.005a.009.009 0 00.006.002z",
			fill: c.fill
		}),
		/* @__PURE__ */ (0, react_jsx_runtime.jsxs)("defs", { children: [
			/* @__PURE__ */ (0, react_jsx_runtime.jsxs)("linearGradient", {
				gradientUnits: "userSpaceOnUse",
				id: a.id,
				x1: ".478",
				x2: "22.985",
				y1: "3.451",
				y2: "19.698",
				children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)("stop", { stopColor: "#6F11F4" }), /* @__PURE__ */ (0, react_jsx_runtime.jsx)("stop", {
					offset: "1",
					stopColor: "#AA66F1"
				})]
			}),
			/* @__PURE__ */ (0, react_jsx_runtime.jsxs)("linearGradient", {
				gradientUnits: "userSpaceOnUse",
				id: b.id,
				x1: "21.676",
				x2: "2.034",
				y1: ".006",
				y2: "23.987",
				children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)("stop", { stopColor: "#F52C77" }), /* @__PURE__ */ (0, react_jsx_runtime.jsx)("stop", {
					offset: "1",
					stopColor: "#E9A45F",
					stopOpacity: ".996"
				})]
			}),
			/* @__PURE__ */ (0, react_jsx_runtime.jsxs)("linearGradient", {
				gradientUnits: "userSpaceOnUse",
				id: c.id,
				x1: "21.676",
				x2: "2.034",
				y1: ".006",
				y2: "23.987",
				children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)("stop", { stopColor: "#F52C77" }), /* @__PURE__ */ (0, react_jsx_runtime.jsx)("stop", {
					offset: "1",
					stopColor: "#E9A45F",
					stopOpacity: ".996"
				})]
			})
		] })
	] }));
});
var Color_default$43 = Icon$3;

//#endregion
//#region node_modules/.pnpm/@lobehub+icons@5.16.0_@types+react@18.3.31_react@18.3.1/node_modules/@lobehub/icons/es/Yi/style.js
var TITLE$2 = "Yi";

//#endregion
//#region node_modules/.pnpm/@lobehub+icons@5.16.0_@types+react@18.3.31_react@18.3.1/node_modules/@lobehub/icons/es/Yi/components/Color.js
function _typeof$2(o) {
	"@babel/helpers - typeof";
	return _typeof$2 = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(o$1) {
		return typeof o$1;
	} : function(o$1) {
		return o$1 && "function" == typeof Symbol && o$1.constructor === Symbol && o$1 !== Symbol.prototype ? "symbol" : typeof o$1;
	}, _typeof$2(o);
}
var _excluded$2 = ["size", "style"];
function ownKeys$2(e, r) {
	var t = Object.keys(e);
	if (Object.getOwnPropertySymbols) {
		var o = Object.getOwnPropertySymbols(e);
		r && (o = o.filter(function(r$1) {
			return Object.getOwnPropertyDescriptor(e, r$1).enumerable;
		})), t.push.apply(t, o);
	}
	return t;
}
function _objectSpread$2(e) {
	for (var r = 1; r < arguments.length; r++) {
		var t = null != arguments[r] ? arguments[r] : {};
		r % 2 ? ownKeys$2(Object(t), !0).forEach(function(r$1) {
			_defineProperty$2(e, r$1, t[r$1]);
		}) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys$2(Object(t)).forEach(function(r$1) {
			Object.defineProperty(e, r$1, Object.getOwnPropertyDescriptor(t, r$1));
		});
	}
	return e;
}
function _defineProperty$2(obj, key, value) {
	key = _toPropertyKey$2(key);
	if (key in obj) Object.defineProperty(obj, key, {
		value,
		enumerable: true,
		configurable: true,
		writable: true
	});
	else obj[key] = value;
	return obj;
}
function _toPropertyKey$2(t) {
	var i = _toPrimitive$2(t, "string");
	return "symbol" == _typeof$2(i) ? i : String(i);
}
function _toPrimitive$2(t, r) {
	if ("object" != _typeof$2(t) || !t) return t;
	var e = t[Symbol.toPrimitive];
	if (void 0 !== e) {
		var i = e.call(t, r || "default");
		if ("object" != _typeof$2(i)) return i;
		throw new TypeError("@@toPrimitive must return a primitive value.");
	}
	return ("string" === r ? String : Number)(t);
}
function _objectWithoutProperties$2(source, excluded) {
	if (source == null) return {};
	var target = _objectWithoutPropertiesLoose$2(source, excluded);
	var key, i;
	if (Object.getOwnPropertySymbols) {
		var sourceSymbolKeys = Object.getOwnPropertySymbols(source);
		for (i = 0; i < sourceSymbolKeys.length; i++) {
			key = sourceSymbolKeys[i];
			if (excluded.indexOf(key) >= 0) continue;
			if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue;
			target[key] = source[key];
		}
	}
	return target;
}
function _objectWithoutPropertiesLoose$2(source, excluded) {
	if (source == null) return {};
	var target = {};
	var sourceKeys = Object.keys(source);
	var key, i;
	for (i = 0; i < sourceKeys.length; i++) {
		key = sourceKeys[i];
		if (excluded.indexOf(key) >= 0) continue;
		target[key] = source[key];
	}
	return target;
}
var Icon$2 = /* @__PURE__ */ (0, react.memo)(function(_ref) {
	var _ref$size = _ref.size, size = _ref$size === void 0 ? "1em" : _ref$size, style = _ref.style, rest = _objectWithoutProperties$2(_ref, _excluded$2);
	return /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("svg", _objectSpread$2(_objectSpread$2({
		fill: "currentColor",
		fillRule: "evenodd",
		height: size,
		style: _objectSpread$2({
			flex: "none",
			lineHeight: 1
		}, style),
		viewBox: "0 0 24 24",
		width: size,
		xmlns: "http://www.w3.org/2000/svg"
	}, rest), {}, { children: [
		/* @__PURE__ */ (0, react_jsx_runtime.jsx)("title", { children: TITLE$2 }),
		/* @__PURE__ */ (0, react_jsx_runtime.jsx)("path", { d: "M18.62 13.927c.611 0 1.107.505 1.107 1.128v5.817c0 .623-.496 1.128-1.108 1.128a1.118 1.118 0 01-1.108-1.128v-5.817c0-.623.496-1.128 1.108-1.128zM16.59 3.052a1.094 1.094 0 011.562-.129c.466.404.522 1.116.126 1.59l-5.938 7.111v9.147c0 .624-.496 1.129-1.108 1.129a1.118 1.118 0 01-1.108-1.129v-9.477l.003-.088.01-.087c.015-.232.102-.462.261-.654l6.192-7.413zM2.906 2.256a1.094 1.094 0 011.559.157l4.387 5.45a1.142 1.142 0 01-.155 1.587 1.094 1.094 0 01-1.559-.157l-4.387-5.45a1.144 1.144 0 01.06-1.498l.095-.09z" }),
		/* @__PURE__ */ (0, react_jsx_runtime.jsx)("ellipse", {
			cx: "20.146",
			cy: "10.692",
			fill: "#00FF25",
			rx: "1.354",
			ry: "1.379"
		})
	] }));
});
var Color_default$44 = Icon$2;

//#endregion
//#region node_modules/.pnpm/@lobehub+icons@5.16.0_@types+react@18.3.31_react@18.3.1/node_modules/@lobehub/icons/es/ZAI/style.js
var TITLE$1 = "Z.ai";

//#endregion
//#region node_modules/.pnpm/@lobehub+icons@5.16.0_@types+react@18.3.31_react@18.3.1/node_modules/@lobehub/icons/es/ZAI/components/Mono.js
function _typeof$1(o) {
	"@babel/helpers - typeof";
	return _typeof$1 = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(o$1) {
		return typeof o$1;
	} : function(o$1) {
		return o$1 && "function" == typeof Symbol && o$1.constructor === Symbol && o$1 !== Symbol.prototype ? "symbol" : typeof o$1;
	}, _typeof$1(o);
}
var _excluded$1 = ["size", "style"];
function ownKeys$1(e, r) {
	var t = Object.keys(e);
	if (Object.getOwnPropertySymbols) {
		var o = Object.getOwnPropertySymbols(e);
		r && (o = o.filter(function(r$1) {
			return Object.getOwnPropertyDescriptor(e, r$1).enumerable;
		})), t.push.apply(t, o);
	}
	return t;
}
function _objectSpread$1(e) {
	for (var r = 1; r < arguments.length; r++) {
		var t = null != arguments[r] ? arguments[r] : {};
		r % 2 ? ownKeys$1(Object(t), !0).forEach(function(r$1) {
			_defineProperty$1(e, r$1, t[r$1]);
		}) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys$1(Object(t)).forEach(function(r$1) {
			Object.defineProperty(e, r$1, Object.getOwnPropertyDescriptor(t, r$1));
		});
	}
	return e;
}
function _defineProperty$1(obj, key, value) {
	key = _toPropertyKey$1(key);
	if (key in obj) Object.defineProperty(obj, key, {
		value,
		enumerable: true,
		configurable: true,
		writable: true
	});
	else obj[key] = value;
	return obj;
}
function _toPropertyKey$1(t) {
	var i = _toPrimitive$1(t, "string");
	return "symbol" == _typeof$1(i) ? i : String(i);
}
function _toPrimitive$1(t, r) {
	if ("object" != _typeof$1(t) || !t) return t;
	var e = t[Symbol.toPrimitive];
	if (void 0 !== e) {
		var i = e.call(t, r || "default");
		if ("object" != _typeof$1(i)) return i;
		throw new TypeError("@@toPrimitive must return a primitive value.");
	}
	return ("string" === r ? String : Number)(t);
}
function _objectWithoutProperties$1(source, excluded) {
	if (source == null) return {};
	var target = _objectWithoutPropertiesLoose$1(source, excluded);
	var key, i;
	if (Object.getOwnPropertySymbols) {
		var sourceSymbolKeys = Object.getOwnPropertySymbols(source);
		for (i = 0; i < sourceSymbolKeys.length; i++) {
			key = sourceSymbolKeys[i];
			if (excluded.indexOf(key) >= 0) continue;
			if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue;
			target[key] = source[key];
		}
	}
	return target;
}
function _objectWithoutPropertiesLoose$1(source, excluded) {
	if (source == null) return {};
	var target = {};
	var sourceKeys = Object.keys(source);
	var key, i;
	for (i = 0; i < sourceKeys.length; i++) {
		key = sourceKeys[i];
		if (excluded.indexOf(key) >= 0) continue;
		target[key] = source[key];
	}
	return target;
}
var Icon$1 = /* @__PURE__ */ (0, react.memo)(function(_ref) {
	var _ref$size = _ref.size, size = _ref$size === void 0 ? "1em" : _ref$size, style = _ref.style, rest = _objectWithoutProperties$1(_ref, _excluded$1);
	return /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("svg", _objectSpread$1(_objectSpread$1({
		fill: "currentColor",
		fillRule: "evenodd",
		height: size,
		style: _objectSpread$1({
			flex: "none",
			lineHeight: 1
		}, style),
		viewBox: "0 0 24 24",
		width: size,
		xmlns: "http://www.w3.org/2000/svg"
	}, rest), {}, { children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)("title", { children: TITLE$1 }), /* @__PURE__ */ (0, react_jsx_runtime.jsx)("path", { d: "M12.105 2L9.927 4.953H.653L2.83 2h9.276zM23.254 19.048L21.078 22h-9.242l2.174-2.952h9.244zM24 2L9.264 22H0L14.736 2H24z" })] }));
});
var Mono_default$16 = Icon$1;

//#endregion
//#region node_modules/.pnpm/@lobehub+icons@5.16.0_@types+react@18.3.31_react@18.3.1/node_modules/@lobehub/icons/es/Zhipu/style.js
var TITLE = "Zhipu";

//#endregion
//#region node_modules/.pnpm/@lobehub+icons@5.16.0_@types+react@18.3.31_react@18.3.1/node_modules/@lobehub/icons/es/Zhipu/components/Color.js
function _typeof(o) {
	"@babel/helpers - typeof";
	return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(o$1) {
		return typeof o$1;
	} : function(o$1) {
		return o$1 && "function" == typeof Symbol && o$1.constructor === Symbol && o$1 !== Symbol.prototype ? "symbol" : typeof o$1;
	}, _typeof(o);
}
var _excluded = ["size", "style"];
function ownKeys(e, r) {
	var t = Object.keys(e);
	if (Object.getOwnPropertySymbols) {
		var o = Object.getOwnPropertySymbols(e);
		r && (o = o.filter(function(r$1) {
			return Object.getOwnPropertyDescriptor(e, r$1).enumerable;
		})), t.push.apply(t, o);
	}
	return t;
}
function _objectSpread(e) {
	for (var r = 1; r < arguments.length; r++) {
		var t = null != arguments[r] ? arguments[r] : {};
		r % 2 ? ownKeys(Object(t), !0).forEach(function(r$1) {
			_defineProperty(e, r$1, t[r$1]);
		}) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function(r$1) {
			Object.defineProperty(e, r$1, Object.getOwnPropertyDescriptor(t, r$1));
		});
	}
	return e;
}
function _defineProperty(obj, key, value) {
	key = _toPropertyKey(key);
	if (key in obj) Object.defineProperty(obj, key, {
		value,
		enumerable: true,
		configurable: true,
		writable: true
	});
	else obj[key] = value;
	return obj;
}
function _toPropertyKey(t) {
	var i = _toPrimitive(t, "string");
	return "symbol" == _typeof(i) ? i : String(i);
}
function _toPrimitive(t, r) {
	if ("object" != _typeof(t) || !t) return t;
	var e = t[Symbol.toPrimitive];
	if (void 0 !== e) {
		var i = e.call(t, r || "default");
		if ("object" != _typeof(i)) return i;
		throw new TypeError("@@toPrimitive must return a primitive value.");
	}
	return ("string" === r ? String : Number)(t);
}
function _objectWithoutProperties(source, excluded) {
	if (source == null) return {};
	var target = _objectWithoutPropertiesLoose(source, excluded);
	var key, i;
	if (Object.getOwnPropertySymbols) {
		var sourceSymbolKeys = Object.getOwnPropertySymbols(source);
		for (i = 0; i < sourceSymbolKeys.length; i++) {
			key = sourceSymbolKeys[i];
			if (excluded.indexOf(key) >= 0) continue;
			if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue;
			target[key] = source[key];
		}
	}
	return target;
}
function _objectWithoutPropertiesLoose(source, excluded) {
	if (source == null) return {};
	var target = {};
	var sourceKeys = Object.keys(source);
	var key, i;
	for (i = 0; i < sourceKeys.length; i++) {
		key = sourceKeys[i];
		if (excluded.indexOf(key) >= 0) continue;
		target[key] = source[key];
	}
	return target;
}
var Icon = /* @__PURE__ */ (0, react.memo)(function(_ref) {
	var _ref$size = _ref.size, size = _ref$size === void 0 ? "1em" : _ref$size, style = _ref.style, rest = _objectWithoutProperties(_ref, _excluded);
	return /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("svg", _objectSpread(_objectSpread({
		height: size,
		style: _objectSpread({
			flex: "none",
			lineHeight: 1
		}, style),
		viewBox: "0 0 24 24",
		width: size,
		xmlns: "http://www.w3.org/2000/svg"
	}, rest), {}, { children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)("title", { children: TITLE }), /* @__PURE__ */ (0, react_jsx_runtime.jsx)("path", {
		d: "M11.991 23.503a.24.24 0 00-.244.248.24.24 0 00.244.249.24.24 0 00.245-.249.24.24 0 00-.22-.247l-.025-.001zM9.671 5.365a1.697 1.697 0 011.099 2.132l-.071.172-.016.04-.018.054c-.07.16-.104.32-.104.498-.035.71.47 1.279 1.186 1.314h.366c1.309.053 2.338 1.173 2.286 2.523-.052 1.332-1.152 2.38-2.478 2.327h-.174c-.715.018-1.274.64-1.239 1.368 0 .124.018.23.053.337.209.373.54.658.96.8.75.23 1.517-.125 1.9-.782l.018-.035c.402-.64 1.17-.96 1.92-.711.854.284 1.378 1.226 1.099 2.167a1.661 1.661 0 01-2.077 1.102 1.711 1.711 0 01-.907-.711l-.017-.035c-.2-.323-.463-.58-.851-.711l-.056-.018a1.646 1.646 0 00-1.954.746 1.66 1.66 0 01-1.065.764 1.677 1.677 0 01-1.989-1.279c-.209-.906.332-1.83 1.257-2.043a1.51 1.51 0 01.296-.035h.018c.68-.071 1.151-.622 1.116-1.333a1.307 1.307 0 00-.227-.693 2.515 2.515 0 01-.366-1.403 2.39 2.39 0 01.366-1.208c.14-.195.21-.444.227-.693.018-.71-.506-1.261-1.186-1.332l-.07-.018a1.43 1.43 0 01-.299-.07l-.05-.019a1.7 1.7 0 01-1.047-2.114 1.68 1.68 0 012.094-1.101zm-5.575 10.11c.26-.264.639-.367.994-.27.355.096.633.379.728.74.095.362-.007.748-.267 1.013-.402.41-1.053.41-1.455 0a1.062 1.062 0 010-1.482zm14.845-.294c.359-.09.738.024.992.297.254.274.344.665.237 1.025-.107.36-.396.634-.756.718-.551.128-1.1-.22-1.23-.781a1.05 1.05 0 01.757-1.26zm-.064-4.39c.314.32.49.753.49 1.206 0 .452-.176.886-.49 1.206-.315.32-.74.5-1.185.5-.444 0-.87-.18-1.184-.5a1.727 1.727 0 010-2.412 1.654 1.654 0 012.369 0zm-11.243.163c.364.484.447 1.128.218 1.691a1.665 1.665 0 01-2.188.923c-.855-.36-1.26-1.358-.907-2.228a1.68 1.68 0 011.33-1.038c.593-.08 1.183.169 1.547.652zm11.545-4.221c.368 0 .708.2.892.524.184.324.184.724 0 1.048a1.026 1.026 0 01-.892.524c-.568 0-1.03-.47-1.03-1.048 0-.579.462-1.048 1.03-1.048zm-14.358 0c.368 0 .707.2.891.524.184.324.184.724 0 1.048a1.026 1.026 0 01-.891.524c-.569 0-1.03-.47-1.03-1.048 0-.579.461-1.048 1.03-1.048zm10.031-1.475c.925 0 1.675.764 1.675 1.706s-.75 1.705-1.675 1.705-1.674-.763-1.674-1.705c0-.942.75-1.706 1.674-1.706zm-2.626-.684c.362-.082.653-.356.761-.718a1.062 1.062 0 00-.238-1.028 1.017 1.017 0 00-.996-.294c-.547.14-.881.7-.752 1.257.13.558.675.907 1.225.783zm0 16.876c.359-.087.644-.36.75-.72a1.062 1.062 0 00-.237-1.019 1.018 1.018 0 00-.985-.301 1.037 1.037 0 00-.762.717c-.108.361-.017.754.239 1.028.245.263.606.377.953.305l.043-.01zM17.19 3.5a.631.631 0 00.628-.64c0-.355-.279-.64-.628-.64a.631.631 0 00-.628.64c0 .355.28.64.628.64zm-10.38 0a.631.631 0 00.628-.64c0-.355-.28-.64-.628-.64a.631.631 0 00-.628.64c0 .355.279.64.628.64zm-5.182 7.852a.631.631 0 00-.628.64c0 .354.28.639.628.639a.63.63 0 00.627-.606l.001-.034a.62.62 0 00-.628-.64zm5.182 9.13a.631.631 0 00-.628.64c0 .355.279.64.628.64a.631.631 0 00.628-.64c0-.355-.28-.64-.628-.64zm10.38.018a.631.631 0 00-.628.64c0 .355.28.64.628.64a.631.631 0 00.628-.64c0-.355-.279-.64-.628-.64zm5.182-9.148a.631.631 0 00-.628.64c0 .354.279.639.628.639a.631.631 0 00.628-.64c0-.355-.28-.64-.628-.64zm-.384-4.992a.24.24 0 00.244-.249.24.24 0 00-.244-.249.24.24 0 00-.244.249c0 .142.122.249.244.249zM11.991.497a.24.24 0 00.245-.248A.24.24 0 0011.99 0a.24.24 0 00-.244.249c0 .133.108.236.223.247l.021.001zM2.011 6.36a.24.24 0 00.245-.249.24.24 0 00-.244-.249.24.24 0 00-.244.249.24.24 0 00.244.249zm0 11.263a.24.24 0 00-.243.248.24.24 0 00.244.249.24.24 0 00.244-.249.252.252 0 00-.244-.248zm19.995-.018a.24.24 0 00-.245.248.24.24 0 00.245.25.24.24 0 00.244-.25.252.252 0 00-.244-.248z",
		fill: "#3859FF",
		fillRule: "nonzero"
	})] }));
});
var Color_default$45 = Icon;

//#endregion
//#region src/client/ProviderGlyph.tsx
/**
* Brands whose mark switches variants with the theme: Kimi's colour K is
* white-filled and only reads on dark, so light mode shows the Mono mark.
* Both render and CSS picks one, so a theme toggle needs no re-render.
*/
const THEMED_GLYPHS = { "kimi-coding": {
	light: Mono_default$5,
	dark: Color_default$23
} };
/**
* pi-ai provider id → brand glyph. Several ids share one brand (regional
* twins, subscription routes), which is why this maps ids explicitly.
*/
const GLYPHS = {
	"amazon-bedrock": Color_default$7,
	"ant-ling": Color_default$2,
	anthropic: Color_default$3,
	"azure-openai-responses": Color_default$4,
	baseten: Mono_default,
	cerebras: Color_default$8,
	"cloudflare-ai-gateway": Color_default$9,
	"cloudflare-workers-ai": Color_default$9,
	deepseek: Color_default$13,
	fireworks: Color_default$15,
	"github-copilot": Mono_default$1,
	google: Color_default$17,
	"google-vertex": Color_default$39,
	groq: Mono_default$3,
	huggingface: Color_default$18,
	minimax: Color_default$25,
	"minimax-cn": Color_default$25,
	mistral: Color_default$26,
	moonshotai: Mono_default$7,
	"moonshotai-cn": Mono_default$7,
	nvidia: Color_default$29,
	openai: Mono_default$10,
	"openai-codex": Color_default$10,
	opencode: Mono_default$11,
	"opencode-go": Mono_default$11,
	openrouter: Color_default$30,
	"qwen-token-plan": Color_default$34,
	"qwen-token-plan-cn": Color_default$34,
	"qwen-token-plan-individual": Color_default$34,
	together: Color_default$38,
	"vercel-ai-gateway": Mono_default$13,
	xai: Mono_default$14,
	xiaomi: Mono_default$15,
	"xiaomi-token-plan-ams": Mono_default$15,
	"xiaomi-token-plan-cn": Mono_default$15,
	"xiaomi-token-plan-sgp": Mono_default$15,
	zai: Mono_default$16,
	"zai-coding-cn": Mono_default$16
};
/**
* Keyword → brand glyph, matched as a substring of `id name endpoint` (never
* the wire protocol — `openai-completions` would brand every gateway OpenAI).
* Order is precedence: house brands and aggregators before the model vendors
* whose names their endpoints embed, specific spellings before short ones.
*/
const KEYWORD_GLYPHS = [
	["opencode", Mono_default$11],
	["openrouter", Color_default$30],
	["siliconflow", Color_default$36],
	["silicon", Color_default$36],
	["aihubmix", Color_default$1],
	["302.ai", Color_default],
	["302ai", Color_default],
	["ppinfra", Color_default$32],
	["ppio", Color_default$32],
	["deepinfra", Color_default$12],
	["novita", Color_default$28],
	["hyperbolic", Color_default$20],
	["sambanova", Color_default$35],
	["nebius", Mono_default$8],
	["modelscope", Color_default$27],
	["dashscope", Color_default$6],
	["bailian", Color_default$6],
	["fireworks", Color_default$15],
	["together", Color_default$38],
	["cerebras", Color_default$8],
	["groq", Mono_default$3],
	["huggingface", Color_default$18],
	["cloudflare", Color_default$9],
	["vercel", Mono_default$13],
	["jina", Mono_default$4],
	["qiniu", Color_default$33],
	["volcengine", Color_default$41],
	["volces", Color_default$41],
	["doubao", Color_default$14],
	["perplexity", Color_default$31],
	["baseten", Mono_default],
	["nvidia", Color_default$29],
	["ollama", Mono_default$9],
	["lmstudio", Mono_default$6],
	["lm-studio", Mono_default$6],
	["xinference", Color_default$43],
	["vllm", Color_default$40],
	["deepseek", Color_default$13],
	["anthropic", Color_default$3],
	["claude", Color_default$3],
	["bigmodel", Color_default$45],
	["zhipu", Color_default$45],
	["glm", Color_default$45],
	["moonshot", Mono_default$7],
	["kimi", Mono_default$7],
	["minimax", Color_default$25],
	["mistral", Color_default$26],
	["cohere", Color_default$11],
	["gemini", Color_default$16],
	["googleapis", Color_default$16],
	["google", Color_default$17],
	["bedrock", Color_default$7],
	["azure", Color_default$4],
	["vertex", Color_default$39],
	["hunyuan", Color_default$19],
	["tencent", Color_default$19],
	["qianfan", Color_default$42],
	["wenxin", Color_default$42],
	["ernie", Color_default$42],
	["baidu", Color_default$42],
	["iflytek", Color_default$21],
	["xinghuo", Color_default$37],
	["spark", Color_default$37],
	["stepfun", Mono_default$12],
	["internlm", Color_default$22],
	["baichuan", Color_default$5],
	["lingyiwanwu", Color_default$44],
	["01.ai", Color_default$44],
	["longcat", Color_default$24],
	["qwen", Color_default$34],
	["aliyun", Color_default$6],
	["grok", Mono_default$2],
	["x.ai", Mono_default$2],
	["z.ai", Mono_default$16],
	["openai", Mono_default$10],
	["gpt", Mono_default$10]
];
/**
* The brand a free-text identity suggests, for a provider the id table does
* not know.
* @returns the glyph, or undefined when nothing matches.
*/
function matchGlyph(id, displayName, baseURL) {
	const haystack = `${id} ${displayName} ${baseURL ?? ""}`.toLowerCase();
	return KEYWORD_GLYPHS.find(([keyword]) => haystack.includes(keyword))?.[1];
}
/**
* The provider id with a split-route protocol suffix removed: the composer's
* groups are ROUTES, and a multi-protocol provider's overflow routes are
* `<provider>-<suffix>` (the suffix set the Host's route planning writes). The
* stem is where the brand lives — `opencode-go-anthropic` is OpenCode's
* route, not Anthropic's.
*/
function routeStem(provider) {
	for (const suffix of [
		"completions",
		"responses",
		"anthropic"
	]) if (provider.endsWith(`-${suffix}`)) return provider.slice(0, -(suffix.length + 1));
	return provider;
}
/**
* Render one provider's brand mark.
* @returns the glyph, a keyword-matched glyph, or a first-letter monogram for
*   a brand nothing recognizes.
*/
function ProviderGlyph({ provider: routeId, displayName, baseURL, size = 18 }) {
	const provider = routeId in THEMED_GLYPHS || routeId in GLYPHS ? routeId : routeStem(routeId);
	const themed = THEMED_GLYPHS[provider];
	if (themed !== void 0) return /* @__PURE__ */ (0, react_jsx_runtime.jsxs)(react_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)(themed.light, {
		size,
		className: `${AccountsSection_module_css_default.glyph} ${AccountsSection_module_css_default.lightOnly}`
	}), /* @__PURE__ */ (0, react_jsx_runtime.jsx)(themed.dark, {
		size,
		className: `${AccountsSection_module_css_default.glyph} ${AccountsSection_module_css_default.darkOnly}`
	})] });
	const Glyph = GLYPHS[provider] ?? matchGlyph(provider, displayName, baseURL);
	if (Glyph === void 0) return /* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", {
		className: AccountsSection_module_css_default.monogram,
		"aria-hidden": "true",
		style: {
			width: size,
			height: size
		},
		children: displayName.slice(0, 1).toUpperCase()
	});
	return /* @__PURE__ */ (0, react_jsx_runtime.jsx)(Glyph, {
		size,
		className: AccountsSection_module_css_default.glyph
	});
}

//#endregion
//#region src/errors.ts
/** Human text for a failure, without leaking a stack into a UI or an HTTP body. */
function errorMessage(error) {
	return error instanceof Error ? error.message : String(error);
}

//#endregion
//#region src/wire.ts
/**
* The HTTP contract between this plugin's Host half and its browser half.
*
* dsh's API gateway method table is closed to out-of-tree plugins, so the Host
* registers its own routes on `ctx.webServer` and the browser half fetches
* them same-origin. Both halves ship from this package and inline this file,
* so the contract has one source instead of two kept in sync.
*/
/**
* Prefix every route of this plugin lives under.
*
* Deliberately NOT under `/plugins/<package>`: the client-module registry owns
* `/plugins` and serves this package's browser bundle at
* `/plugins/dsh-providers/client.js`. The webserver matches the longest
* prefix, so a route there would capture that request and answer JS with JSON.
*/
const PROVIDERS_ROUTE_PREFIX = "/dsh-providers";

//#endregion
//#region src/client/store.ts
/** Value of {@link AccountsState.updating} while the page-level update runs. */
const ALL_PROVIDERS = "*";
/** A provider may emit repeated informational steps during one flow. */
const MAX_INFO_MESSAGES = 64;
/** Source of {@link LoginInfo.id}; the wizard is one flow at a time. */
let nextInfoId = 0;
const INITIAL = {
	status: "idle",
	error: null,
	providers: [],
	selected: null,
	filter: "",
	login: null,
	loggingOut: null,
	routing: null,
	updating: null,
	catalogNotice: null,
	expandedModels: null,
	discovering: null,
	confirmingLogout: null,
	confirmingImport: null,
	importing: null
};
/** Whether a provider can serve a request right now. */
function providerUsable(view) {
	return view.configured && view.error === void 0;
}
/** Fold one login event into the wizard state. */
function reduceLogin(previous, event) {
	switch (event.type) {
		case "auth_url": return {
			...previous,
			authUrl: event.url,
			instructions: event.instructions ?? null
		};
		case "device_code": return {
			...previous,
			deviceCode: {
				userCode: event.userCode,
				verificationUri: event.verificationUri
			}
		};
		case "info": return {
			...previous,
			infos: [...previous.infos, {
				id: nextInfoId++,
				message: event.message,
				links: event.links ?? []
			}].slice(-MAX_INFO_MESSAGES)
		};
		case "progress": return {
			...previous,
			progress: event.message
		};
		case "prompt": {
			const { type: _type,...prompt } = event;
			return {
				...previous,
				answering: false,
				prompt,
				prefillPromptId: previous.prefillPromptId ?? prompt.requestId
			};
		}
		case "prompt_done": return previous.prompt?.requestId === event.requestId ? {
			...previous,
			prompt: null,
			answering: false
		} : previous;
		case "done": return {
			...previous,
			done: true,
			prompt: null,
			answering: false,
			progress: null,
			storedKey: null
		};
		case "error": return {
			...previous,
			error: event.message,
			prompt: null,
			answering: false,
			progress: null
		};
	}
}
/** The accounts page controller and its snapshot source. */
var AccountsStore = class {
	state = INITIAL;
	listeners = /* @__PURE__ */ new Set();
	/** The open event stream, closed when the wizard closes or the flow settles. */
	stream;
	/** Increments per load so a slow reply cannot publish over a newer one. */
	generation = 0;
	/** Increments per login attempt so a slow start cannot drive a newer wizard. */
	loginGeneration = 0;
	/** @param origin - where the account plane is served; the page's own origin. */
	constructor(origin = "") {
		this.origin = origin;
	}
	getSnapshot() {
		return this.state;
	}
	subscribe(listener) {
		this.listeners.add(listener);
		return () => this.listeners.delete(listener);
	}
	/** Publish the next state; the snapshot identity moves only when the state does. */
	set(next) {
		this.state = {
			...this.state,
			...next
		};
		for (const listener of this.listeners) listener();
	}
	/** Update the wizard through its reducer, if one is open. */
	reduce(event) {
		const login = this.state.login;
		if (login === null) return;
		this.set({ login: reduceLogin(login, event) });
	}
	/** Call one account route, surfacing the Host's own message on refusal. */
	async call(path, init) {
		const response = await fetch(`${this.origin}${PROVIDERS_ROUTE_PREFIX}/${path}`, {
			...init,
			headers: {
				"content-type": "application/json",
				...init?.headers
			}
		});
		const text = await response.text();
		let parsed = {};
		try {
			parsed = text.length > 0 ? JSON.parse(text) : {};
		} catch {
			throw new Error(`${response.status} ${response.statusText}`);
		}
		if (!response.ok) throw new Error(parsed.error ?? `${response.status} ${response.statusText}`);
		return parsed;
	}
	/**
	* Load every provider row. A failed refresh of an already loaded page keeps
	* the page and shows the error beside it, rather than replacing loaded data
	* with a blank error screen.
	*/
	async load() {
		const generation = this.generation += 1;
		if (this.state.status === "idle") this.set({ status: "loading" });
		try {
			const { providers } = await this.call("providers");
			if (generation !== this.generation) return;
			this.set({
				status: "ready",
				error: null,
				providers
			});
		} catch (error) {
			if (generation !== this.generation) return;
			this.set({
				...this.state.status === "ready" ? {} : { status: "error" },
				error: errorMessage(error)
			});
		}
	}
	/** Open one provider's card, or close it when it is the one already open. */
	select(providerId) {
		this.set({ selected: this.state.selected === providerId ? null : providerId });
	}
	/** Filter the provider list. */
	filter(value) {
		this.set({ filter: value });
	}
	/** The open wizard, when login attempt `generation` still owns it. */
	currentLogin(providerId, generation) {
		const login = this.state.login;
		if (login === null || login.provider !== providerId || generation !== this.loginGeneration) return null;
		return login;
	}
	/** Open the wizard and start one login flow. */
	async beginLogin(providerId, method) {
		const generation = this.loginGeneration += 1;
		this.closeStream();
		this.set({ login: {
			provider: providerId,
			method,
			loginId: null,
			authUrl: null,
			instructions: null,
			deviceCode: null,
			progress: null,
			infos: [],
			prompt: null,
			answering: false,
			storedKey: null,
			peekingKey: false,
			prefillPromptId: null,
			done: false,
			error: null
		} });
		try {
			const { loginId } = await this.call("login", {
				method: "POST",
				body: JSON.stringify({
					provider: providerId,
					method
				})
			});
			const started = this.currentLogin(providerId, generation);
			if (started === null) return;
			this.set({ login: {
				...started,
				loginId
			} });
			this.openStream(loginId);
		} catch (error) {
			if (this.currentLogin(providerId, generation) === null) return;
			this.reduce({
				type: "error",
				message: errorMessage(error)
			});
		}
	}
	/** Attach to one flow's event stream, replacing any stream still open. */
	openStream(loginId) {
		this.closeStream();
		const stream = new EventSource(`${this.origin}${PROVIDERS_ROUTE_PREFIX}/events?loginId=${encodeURIComponent(loginId)}`);
		this.stream = stream;
		stream.addEventListener("message", (message) => {
			const event = JSON.parse(message.data);
			this.reduce(event);
			if (event.type === "done") {
				this.closeStream();
				this.load();
				return;
			}
			if (event.type === "error") this.closeStream();
		});
		stream.addEventListener("error", () => {
			if (this.state.login?.done === true || this.state.login?.error !== null) return;
			this.closeStream();
			this.reduce({
				type: "error",
				message: "the login stream closed unexpectedly"
			});
		});
	}
	/** Close the event stream if one is open. */
	closeStream() {
		this.stream?.close();
		this.stream = void 0;
	}
	/** Answer the wizard's current question. */
	async answer(value) {
		const login = this.state.login;
		if (login === null || login.prompt === null || login.loginId === null) return;
		const { requestId } = login.prompt;
		this.set({ login: {
			...login,
			answering: true
		} });
		try {
			await this.call("answer", {
				method: "POST",
				body: JSON.stringify({
					loginId: login.loginId,
					requestId,
					value
				})
			});
		} catch (error) {
			this.reduce({
				type: "info",
				message: errorMessage(error)
			});
			this.reduce({
				type: "prompt_done",
				requestId
			});
		}
	}
	/** Abort the flow and close the wizard. */
	async closeLogin() {
		const login = this.state.login;
		this.closeStream();
		this.set({ login: null });
		if (login === null || login.loginId === null || login.done) return;
		try {
			await this.call("cancel", {
				method: "POST",
				body: JSON.stringify({ loginId: login.loginId })
			});
		} catch {}
	}
	/**
	* Reveal the key currently stored for the wizard's provider. An explicit
	* user action, api-key flows only; the Host answers nothing for a provider
	* whose credential is an OAuth account or an ambient environment value.
	*/
	async peekStoredKey() {
		const login = this.state.login;
		if (login === null || login.method !== "api_key" || login.peekingKey || login.storedKey !== null) return;
		const generation = this.loginGeneration;
		this.set({ login: {
			...login,
			peekingKey: true
		} });
		try {
			const { key } = await this.call(`stored-key?provider=${encodeURIComponent(login.provider)}`);
			const current = this.currentLogin(login.provider, generation);
			if (current !== null) this.set({ login: {
				...current,
				peekingKey: false,
				storedKey: key ?? null
			} });
		} catch (error) {
			const current = this.currentLogin(login.provider, generation);
			if (current !== null) this.set({ login: {
				...current,
				peekingKey: false
			} });
			this.reduce({
				type: "info",
				message: errorMessage(error)
			});
		}
	}
	/** Clear a busy marker, unless a newer operation has claimed it since. */
	release(field, token) {
		if (this.state[field] === token) this.set({ [field]: null });
	}
	/**
	* Refresh model catalogs from the curated remote catalog. The button means
	* "update now", so the request bypasses the Host's freshness window.
	* @param providerId - one provider, or undefined for every routed one.
	* @param summarize - renders the reply; the copy lives with the section.
	*/
	async updateCatalog(providerId, summarize) {
		const token = providerId ?? ALL_PROVIDERS;
		this.set({
			updating: token,
			catalogNotice: null
		});
		try {
			const result = await this.call("refresh-catalog", {
				method: "POST",
				body: JSON.stringify({
					force: true,
					...providerId === void 0 ? {} : { provider: providerId }
				})
			});
			await this.load();
			if (this.state.updating === token) this.set({ catalogNotice: summarize(result) });
		} catch (error) {
			if (this.state.updating === token) this.set({ catalogNotice: {
				tone: "warn",
				text: errorMessage(error)
			} });
		} finally {
			this.release("updating", token);
		}
	}
	/** Open or close the endpoint-discovery field for one provider. */
	askDiscover(providerId, baseURL = "") {
		this.set({ discovering: providerId === null ? null : {
			provider: providerId,
			baseURL
		} });
	}
	/** Edit the endpoint the discovery field will interrogate. */
	editDiscoverUrl(baseURL) {
		const discovering = this.state.discovering;
		if (discovering === null) return;
		this.set({ discovering: {
			...discovering,
			baseURL
		} });
	}
	/** Read an OpenAI-compatible listing and adopt it as this provider's model list. */
	async discoverEndpoint(providerId, baseURL, summarize) {
		this.set({
			updating: providerId,
			catalogNotice: null
		});
		try {
			const { count } = await this.call("discover-endpoint", {
				method: "POST",
				body: JSON.stringify({
					provider: providerId,
					...baseURL.trim().length === 0 ? {} : { baseURL }
				})
			});
			await this.load();
			if (this.state.updating === providerId) this.set({
				discovering: null,
				catalogNotice: {
					tone: "ok",
					text: summarize(count)
				}
			});
		} catch (error) {
			if (this.state.updating === providerId) this.set({ catalogNotice: {
				tone: "warn",
				text: errorMessage(error)
			} });
		} finally {
			this.release("updating", providerId);
		}
	}
	/** Show a provider's whole model list rather than its preview. */
	expandModels(providerId) {
		this.set({ expandedModels: providerId });
	}
	/** Ask for confirmation before signing out; sign-out is not undoable. */
	askLogout(providerId) {
		this.set({ confirmingLogout: providerId });
	}
	/** Wire one provider into the Models page without signing in again. */
	async route(providerId) {
		this.set({ routing: providerId });
		try {
			await this.call("route", {
				method: "POST",
				body: JSON.stringify({ provider: providerId })
			});
			await this.load();
		} catch (error) {
			this.set({ error: errorMessage(error) });
		} finally {
			this.release("routing", providerId);
		}
	}
	/** Remove one provider's credential. */
	async logout(providerId, removeRoute) {
		this.set({
			loggingOut: providerId,
			confirmingLogout: null
		});
		try {
			await this.call("logout", {
				method: "POST",
				body: JSON.stringify({
					provider: providerId,
					unroute: removeRoute
				})
			});
			await this.load();
		} catch (error) {
			this.set({ error: errorMessage(error) });
		} finally {
			this.release("loggingOut", providerId);
		}
	}
	/** Ask for confirmation before importing a CLI login; the first refresh may sign the CLI out. */
	askImport(providerId) {
		this.set({ confirmingImport: providerId });
	}
	/** Adopt a detected local CLI login for one provider and reload the page. */
	async importCredential(providerId) {
		this.set({
			importing: providerId,
			confirmingImport: null
		});
		try {
			await this.call("import-credential", {
				method: "POST",
				body: JSON.stringify({ provider: providerId })
			});
			await this.load();
		} catch (error) {
			this.set({ error: errorMessage(error) });
		} finally {
			if (this.state.importing === providerId) this.set({ importing: null });
		}
	}
	/** Close any open stream; called when the plugin unloads. */
	dispose() {
		this.closeStream();
		this.listeners.clear();
	}
};

//#endregion
//#region src/client/ProviderRow.tsx
/**
* A timestamp to the minute. No seconds, and a year only when it is not the
* current one: a token lives for hours and a catalog is checked within days,
* so "how long ago" is all the reader wants — but a catalog left unchecked
* since last summer must not read as tomorrow.
*/
function formatMoment(epochMs) {
	const date = new Date(epochMs);
	return date.toLocaleString(void 0, {
		month: "short",
		day: "numeric",
		...date.getFullYear() !== (/* @__PURE__ */ new Date()).getFullYear() ? { year: "numeric" } : {},
		hour: "2-digit",
		minute: "2-digit"
	});
}
/** The one-line status phrase for a provider. */
function statusText(view, t) {
	if (view.credential === "oauth") return t("statusSignedIn");
	if (view.credential === "api_key") return t("statusApiKey");
	if (view.configured) return t("statusAmbient", { source: view.source ?? "—" });
	return t("statusMissing");
}
/**
* The state dot, rendered only when there is a state to report. Most rows are
* simply not signed in and already say so in words; a dot on all thirty of
* them would drown out the two that matter.
*/
function StatusDot({ view }) {
	if (view.error !== void 0) return /* @__PURE__ */ (0, react_jsx_runtime.jsx)(__deepseek_ai_dsh_client_ui_primitives.StateDot, {
		state: "error",
		size: 8
	});
	if (providerUsable(view)) return /* @__PURE__ */ (0, react_jsx_runtime.jsx)(__deepseek_ai_dsh_client_ui_primitives.StateDot, {
		state: "done",
		size: 8
	});
	return null;
}
/** The label one sign-in method carries, given whether the provider is already connected. */
function methodLabel(method, connected, t) {
	if (method.type === "api_key") return connected ? t("replaceApiKey") : t("signInApiKey");
	if (connected) return t("signInAgain");
	return method.loginLabel ?? t("signInOauthNamed", { name: method.name });
}
/** Render one provider row and, while open, its card. */
function ProviderRow({ view, open, t, loggingOut, routing, updating, expandedModels, discovering, importing, onToggle, onLogin, onAskImport, onRoute, onUpdateCatalog, onAskDiscover, onEditDiscoverUrl, onDiscover, onToggleModels, onAskLogout }) {
	const expired = view.expires !== void 0 && view.expires <= Date.now();
	const subscription = view.methods.some((method) => method.subscription === true);
	const connected = view.credential !== void 0;
	const models = view.models ?? [];
	return /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
		className: `${AccountsSection_module_css_default.row} ${open ? AccountsSection_module_css_default.rowOpen : ""}`,
		children: [/* @__PURE__ */ (0, react_jsx_runtime.jsxs)("button", {
			type: "button",
			"data-provider-id": view.id,
			"aria-expanded": open,
			className: AccountsSection_module_css_default.rowSummary,
			onClick: () => onToggle(view.id),
			children: [
				/* @__PURE__ */ (0, react_jsx_runtime.jsx)(ProviderGlyph, {
					provider: view.id,
					displayName: view.displayName,
					baseURL: view.baseURL
				}),
				/* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", {
					className: AccountsSection_module_css_default.rowName,
					children: view.displayName
				}),
				subscription && /* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", {
					className: AccountsSection_module_css_default.badge,
					children: t("subscription")
				}),
				/* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", {
					className: AccountsSection_module_css_default.rowStatus,
					children: statusText(view, t)
				}),
				/* @__PURE__ */ (0, react_jsx_runtime.jsx)(StatusDot, { view }),
				/* @__PURE__ */ (0, react_jsx_runtime.jsx)(__deepseek_ai_dsh_client_ui_primitives.IconChevronDownOutline14, { className: open ? AccountsSection_module_css_default.chevronOpen : AccountsSection_module_css_default.chevron })
			]
		}), open && /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
			className: AccountsSection_module_css_default.card,
			children: [
				(view.expires !== void 0 || view.catalogCheckedAt !== void 0) && /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("p", {
					className: AccountsSection_module_css_default.meta,
					children: [
						view.expires !== void 0 && /* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", {
							className: expired ? AccountsSection_module_css_default.warn : void 0,
							children: expired ? t("expired") : t("expiresAt", { time: formatMoment(view.expires) })
						}),
						view.expires !== void 0 && view.catalogCheckedAt !== void 0 && /* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", {
							"aria-hidden": "true",
							children: "·"
						}),
						view.catalogCheckedAt !== void 0 && /* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", { children: t("catalogChecked", { time: formatMoment(view.catalogCheckedAt) }) })
					]
				}),
				view.error !== void 0 && /* @__PURE__ */ (0, react_jsx_runtime.jsx)("p", {
					className: AccountsSection_module_css_default.error,
					children: view.error
				}),
				view.routed && /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
					className: AccountsSection_module_css_default.models,
					children: [
						/* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
							className: AccountsSection_module_css_default.modelsHead,
							children: [
								/* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", {
									className: AccountsSection_module_css_default.modelsLabel,
									children: t("models", { count: models.length })
								}),
								/* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", { className: AccountsSection_module_css_default.grow }),
								/* @__PURE__ */ (0, react_jsx_runtime.jsx)(__deepseek_ai_dsh_client_ui_primitives.Button, {
									variant: "ghost",
									size: "sm",
									disabled: updating,
									onClick: () => onUpdateCatalog(view.id),
									children: updating ? t("updatingCatalog") : t("updateCatalog")
								}),
								view.discoverable === true && /* @__PURE__ */ (0, react_jsx_runtime.jsx)(__deepseek_ai_dsh_client_ui_primitives.Button, {
									variant: "ghost",
									size: "sm",
									disabled: updating,
									onClick: () => onAskDiscover(discovering === null ? view.id : null, view.baseURL ?? ""),
									children: t("discoverEndpoint")
								})
							]
						}),
						discovering !== null && /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("form", {
							className: AccountsSection_module_css_default.discover,
							onSubmit: (event) => {
								event.preventDefault();
								onDiscover(view.id, discovering);
							},
							children: [
								/* @__PURE__ */ (0, react_jsx_runtime.jsx)(__deepseek_ai_dsh_client_ui_primitives.Input, {
									className: AccountsSection_module_css_default.discoverInput,
									value: discovering,
									placeholder: view.baseURL ?? "https://…/v1",
									"aria-label": t("discoverEndpointLabel"),
									onChange: (event) => onEditDiscoverUrl(event.target.value)
								}),
								/* @__PURE__ */ (0, react_jsx_runtime.jsx)(__deepseek_ai_dsh_client_ui_primitives.Button, {
									type: "submit",
									variant: "outline",
									size: "sm",
									disabled: updating,
									children: updating ? t("discoveringEndpoint") : t("discoverSubmit")
								}),
								/* @__PURE__ */ (0, react_jsx_runtime.jsx)(__deepseek_ai_dsh_client_ui_primitives.Button, {
									variant: "ghost",
									size: "sm",
									onClick: () => onAskDiscover(null),
									children: t("cancel")
								}),
								/* @__PURE__ */ (0, react_jsx_runtime.jsx)("p", {
									className: AccountsSection_module_css_default.hint,
									children: t("discoverHint")
								})
							]
						}),
						/* @__PURE__ */ (0, react_jsx_runtime.jsx)(ModelList, {
							models,
							expanded: expandedModels,
							t,
							onToggleExpand: () => onToggleModels(view.id)
						})
					]
				}),
				view.configured && !view.routed && /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
					className: AccountsSection_module_css_default.notice,
					children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", {
						className: AccountsSection_module_css_default.warn,
						children: t("noRoute")
					}), /* @__PURE__ */ (0, react_jsx_runtime.jsx)(__deepseek_ai_dsh_client_ui_primitives.Button, {
						variant: "outline",
						size: "sm",
						disabled: routing,
						onClick: () => onRoute(view.id),
						children: routing ? t("routing") : t("routeNow")
					})]
				}),
				/* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
					className: AccountsSection_module_css_default.actions,
					children: [
						view.methods.map((method) => /* @__PURE__ */ (0, react_jsx_runtime.jsx)(__deepseek_ai_dsh_client_ui_primitives.Button, {
							variant: !connected && method.type === "oauth" ? "primary" : "outline",
							onClick: () => onLogin(view.id, method.type),
							children: methodLabel(method, connected, t)
						}, method.type)),
						view.importSource !== void 0 && /* @__PURE__ */ (0, react_jsx_runtime.jsx)(__deepseek_ai_dsh_client_ui_primitives.Button, {
							variant: "outline",
							disabled: importing,
							onClick: () => onAskImport(view.id),
							children: importing ? t("importing") : t("importFrom", { source: view.importSource })
						}),
						connected && /* @__PURE__ */ (0, react_jsx_runtime.jsx)(__deepseek_ai_dsh_client_ui_primitives.Button, {
							variant: "ghost",
							className: AccountsSection_module_css_default.destructive,
							disabled: loggingOut,
							onClick: () => onAskLogout(view.id),
							children: loggingOut ? t("signingOut") : t("signOut")
						})
					]
				}),
				view.methods.length === 0 && /* @__PURE__ */ (0, react_jsx_runtime.jsx)("p", {
					className: AccountsSection_module_css_default.hint,
					children: t("noMethods")
				}),
				view.credential === void 0 && view.configured && /* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", {
					className: AccountsSection_module_css_default.factRef,
					children: t("reference", { ref: view.ref })
				})
			]
		})]
	});
}

//#endregion
//#region src/client/AccountsSection.tsx
/**
* One line for what a catalog update did. A batch that updated thirty-nine
* providers and failed on one is neither a success nor a failure, so the
* changed count leads and the failures are named.
*/
function summarizeUpdate(result, t) {
	const changed = result.updated.filter((update) => update.changed);
	const failed = result.errors;
	if (failed.length > 0) return {
		tone: "warn",
		text: t("catalogPartial", {
			count: failed.length,
			providers: failed.map((error) => error.provider).join(", "),
			reason: failed[0]?.message ?? ""
		})
	};
	if (changed.length === 0) return {
		tone: "ok",
		text: t("catalogUnchanged")
	};
	return {
		tone: "ok",
		text: t("catalogUpdated", {
			count: changed.length,
			models: changed.reduce((total, update) => total + update.count, 0)
		})
	};
}
/** Whether one provider matches the current filter, by id or display name. */
function matches(view, needle) {
	if (needle.length === 0) return true;
	const lowered = needle.toLowerCase();
	return view.id.toLowerCase().includes(lowered) || view.displayName.toLowerCase().includes(lowered);
}
/**
* Render the Accounts settings page.
* @returns the page, or null before the inject face is bound.
*/
function AccountsSection({ controller, useSnapshot, t }) {
	return controller !== void 0 && useSnapshot !== void 0 && t !== void 0 ? /* @__PURE__ */ (0, react_jsx_runtime.jsx)(Page, {
		controller,
		useSnapshot,
		t
	}) : null;
}
/** The page proper, with the inject face proven present. */
function Page({ controller, useSnapshot, t }) {
	const status = useSnapshot((state) => state.status);
	const error = useSnapshot((state) => state.error);
	const providers = useSnapshot((state) => state.providers);
	const openRow = useSnapshot((state) => state.selected);
	const filter = useSnapshot((state) => state.filter);
	const login = useSnapshot((state) => state.login);
	const loggingOut = useSnapshot((state) => state.loggingOut);
	const routing = useSnapshot((state) => state.routing);
	const updating = useSnapshot((state) => state.updating);
	const catalogNotice = useSnapshot((state) => state.catalogNotice);
	const expandedModels = useSnapshot((state) => state.expandedModels);
	const discovering = useSnapshot((state) => state.discovering);
	const confirmingLogout = useSnapshot((state) => state.confirmingLogout);
	const confirmingImport = useSnapshot((state) => state.confirmingImport);
	const importing = useSnapshot((state) => state.importing);
	(0, react.useEffect)(() => {
		controller.load();
	}, [controller]);
	(0, react.useEffect)(() => {
		const refresh = () => {
			if (document.visibilityState === "visible") controller.load();
		};
		window.addEventListener("focus", refresh);
		document.addEventListener("visibilitychange", refresh);
		return () => {
			window.removeEventListener("focus", refresh);
			document.removeEventListener("visibilitychange", refresh);
		};
	}, [controller]);
	const visible = providers.filter((view) => matches(view, filter));
	const connected = visible.filter((view) => view.credential !== void 0 || view.configured);
	const rest = visible.filter((view) => view.credential === void 0 && !view.configured);
	const rowProps = {
		t,
		onToggle: (providerId) => controller.select(providerId),
		onLogin: (providerId, method) => {
			controller.beginLogin(providerId, method);
		},
		onRoute: (providerId) => {
			controller.route(providerId);
		},
		onUpdateCatalog: (providerId) => {
			controller.updateCatalog(providerId, (result) => summarizeUpdate(result, t));
		},
		onAskDiscover: (providerId, baseURL) => {
			controller.askDiscover(providerId, baseURL);
		},
		onEditDiscoverUrl: (baseURL) => controller.editDiscoverUrl(baseURL),
		onDiscover: (providerId, baseURL) => {
			controller.discoverEndpoint(providerId, baseURL, (count) => t("discovered", { count }));
		},
		onToggleModels: (providerId) => {
			controller.expandModels(expandedModels === providerId ? null : providerId);
		},
		onAskLogout: (providerId) => controller.askLogout(providerId),
		onAskImport: (providerId) => controller.askImport(providerId)
	};
	const group = (label, rows) => rows.length === 0 ? null : /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("section", {
		className: AccountsSection_module_css_default.group,
		children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)("h3", {
			className: AccountsSection_module_css_default.groupLabel,
			children: label
		}), rows.map((view) => /* @__PURE__ */ (0, react_jsx_runtime.jsx)(ProviderRow, {
			view,
			open: openRow === view.id,
			loggingOut: loggingOut === view.id,
			routing: routing === view.id,
			updating: updating === view.id || updating === ALL_PROVIDERS,
			importing: importing === view.id,
			expandedModels: expandedModels === view.id,
			discovering: discovering?.provider === view.id ? discovering.baseURL : null,
			...rowProps
		}, view.id))]
	});
	return /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
		className: AccountsSection_module_css_default.section,
		children: [
			/* @__PURE__ */ (0, react_jsx_runtime.jsx)("p", {
				className: AccountsSection_module_css_default.intro,
				children: t("intro")
			}),
			error !== null && /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
				className: AccountsSection_module_css_default.notice,
				children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", {
					className: AccountsSection_module_css_default.error,
					children: error
				}), /* @__PURE__ */ (0, react_jsx_runtime.jsx)(__deepseek_ai_dsh_client_ui_primitives.Button, {
					variant: "outline",
					size: "sm",
					onClick: () => void controller.load(),
					children: t("retry")
				})]
			}),
			status === "loading" && /* @__PURE__ */ (0, react_jsx_runtime.jsx)("p", {
				className: AccountsSection_module_css_default.hint,
				children: t("loading")
			}),
			status === "ready" && /* @__PURE__ */ (0, react_jsx_runtime.jsxs)(react_jsx_runtime.Fragment, { children: [
				/* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
					className: AccountsSection_module_css_default.toolbar,
					children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)(__deepseek_ai_dsh_client_ui_primitives.Input, {
						className: AccountsSection_module_css_default.search,
						icon: /* @__PURE__ */ (0, react_jsx_runtime.jsx)(__deepseek_ai_dsh_client_ui_primitives.IconSearchOutline16, {}),
						value: filter,
						placeholder: t("search"),
						"aria-label": t("search"),
						onChange: (event) => controller.filter(event.target.value)
					}), /* @__PURE__ */ (0, react_jsx_runtime.jsx)(__deepseek_ai_dsh_client_ui_primitives.Button, {
						variant: "outline",
						disabled: updating !== null,
						onClick: () => void controller.updateCatalog(void 0, (result) => summarizeUpdate(result, t)),
						children: updating === ALL_PROVIDERS ? t("updatingCatalogs") : t("updateCatalogs")
					})]
				}),
				catalogNotice !== null && /* @__PURE__ */ (0, react_jsx_runtime.jsx)("p", {
					className: `${AccountsSection_module_css_default.catalogNotice} ${catalogNotice.tone === "warn" ? AccountsSection_module_css_default.warn : ""}`,
					children: catalogNotice.text
				}),
				/* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
					className: AccountsSection_module_css_default.list,
					children: [
						group(t("groupConnected"), connected),
						group(t("groupAll"), rest),
						visible.length === 0 && /* @__PURE__ */ (0, react_jsx_runtime.jsx)("p", {
							className: AccountsSection_module_css_default.hint,
							children: t("empty")
						})
					]
				})
			] }),
			confirmingLogout !== null && (() => {
				const target = providers.find((candidate) => candidate.id === confirmingLogout);
				return /* @__PURE__ */ (0, react_jsx_runtime.jsx)(LogoutDialog, {
					providerName: target?.displayName ?? confirmingLogout,
					routed: target?.routed === true,
					busy: loggingOut === confirmingLogout,
					t,
					onCancel: () => controller.askLogout(null),
					onConfirm: (removeRoute) => void controller.logout(confirmingLogout, removeRoute)
				});
			})(),
			confirmingImport !== null && (() => {
				return /* @__PURE__ */ (0, react_jsx_runtime.jsx)(__deepseek_ai_dsh_client_ui_primitives.Modal, {
					open: true,
					onClose: () => controller.askImport(null),
					title: t("importTitle", { source: providers.find((candidate) => candidate.id === confirmingImport)?.importSource ?? "" }),
					closeLabel: t("close"),
					description: t("importDescription"),
					footer: /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
						className: AccountsSection_module_css_default.actions,
						children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)(__deepseek_ai_dsh_client_ui_primitives.Button, {
							variant: "ghost",
							onClick: () => controller.askImport(null),
							children: t("cancel")
						}), /* @__PURE__ */ (0, react_jsx_runtime.jsx)(__deepseek_ai_dsh_client_ui_primitives.Button, {
							variant: "primary",
							disabled: importing === confirmingImport,
							onClick: () => void controller.importCredential(confirmingImport),
							children: importing === confirmingImport ? t("importing") : t("importConfirm")
						})]
					})
				});
			})(),
			login !== null && /* @__PURE__ */ (0, react_jsx_runtime.jsx)(LoginDialog, {
				flow: login,
				providerName: providers.find((candidate) => candidate.id === login.provider)?.displayName ?? login.provider,
				t,
				onAnswer: (value) => void controller.answer(value),
				onPeekKey: () => void controller.peekStoredKey(),
				onClose: () => void controller.closeLogin()
			})
		]
	});
}

//#endregion
//#region src/client/ModelSeat.tsx
/** Render the composer model seat with provider glyphs. */
function ModelSeat({ locked, available, directory, load, select, t }) {
	const state = (0, react.useSyncExternalStore)((fn) => directory.subscribe(fn), () => directory.getSnapshot());
	const [open, setOpen] = (0, react.useState)(false);
	const [pane, setPane] = (0, react.useState)("root");
	/** Whether the snapshot's error came from a load or a selection. */
	const lastAction = (0, react.useRef)("load");
	const [toast, setToast] = (0, react.useState)(null);
	const toastSeq = (0, react.useRef)(0);
	const rootRef = (0, react.useRef)(null);
	const triggerRef = (0, react.useRef)(null);
	const itemRefs = (0, react.useRef)([]);
	const id = (0, react.useId)();
	const choices = (0, react.useMemo)(() => state.groups.flatMap((group) => group.models.map((model) => ({
		group,
		model
	}))), [state.groups]);
	const current = state.current === null ? void 0 : choices.find((choice) => choice.group.id === state.current?.provider && choice.model.id === state.current.model);
	const reasoning = current?.model.reasoning;
	const effectiveEffort = state.current?.reasoningEffort ?? reasoning?.defaultEffort;
	const effortLabel = reasoning === void 0 ? void 0 : effectiveEffort === void 0 ? t("effort.providerDefault") : reasoning.efforts.find((level) => level.id === effectiveEffort)?.name ?? effectiveEffort;
	const effortChoices = (0, react.useMemo)(() => reasoning === void 0 ? [] : [...reasoning.defaultEffort === void 0 ? [{
		key: "provider-default",
		effort: void 0,
		label: t("effort.providerDefault")
	}] : [], ...reasoning.efforts.map((effort) => ({
		key: `effort:${effort.id}`,
		effort: effort.id,
		label: effort.name,
		...effort.description === void 0 ? {} : { description: effort.description }
	}))], [reasoning, t]);
	const busy = state.status === "selecting";
	const reload = () => {
		lastAction.current = "load";
		load();
	};
	(0, react.useEffect)(() => {
		if (available) {
			lastAction.current = "load";
			load();
		}
	}, [available, load]);
	(0, react.useEffect)(() => {
		if (!open) return;
		const closeOutside = (event) => {
			if (!(event.target instanceof Node && rootRef.current?.contains(event.target) === true)) setOpen(false);
		};
		document.addEventListener("mousedown", closeOutside);
		return () => document.removeEventListener("mousedown", closeOutside);
	}, [open]);
	if (!available) return null;
	const close = (restoreFocus = false) => {
		setOpen(false);
		setPane("root");
		if (restoreFocus) queueMicrotask(() => triggerRef.current?.focus());
	};
	const moveFocus = (offset) => {
		const items = itemRefs.current.filter((item) => item !== null);
		if (items.length === 0) return;
		const active = items.findIndex((item) => item === document.activeElement);
		items[(Math.max(active, 0) + offset + items.length) % items.length]?.focus();
	};
	const onRootKeyDown = (event) => {
		if (event.key === "Escape" && open) {
			event.preventDefault();
			if (pane !== "root") setPane("root");
			else close(true);
			return;
		}
		if (!open) return;
		if (event.key === "ArrowDown" || event.key === "ArrowUp") {
			event.preventDefault();
			moveFocus(event.key === "ArrowDown" ? 1 : -1);
		}
	};
	const onBlur = (event) => {
		if (event.relatedTarget instanceof Node && rootRef.current?.contains(event.relatedTarget) === true) return;
		close();
	};
	const settleSelection = (accepted) => {
		if (accepted) {
			if (rootRef.current !== null) close(true);
			return;
		}
		const message = directory.getSnapshot().error;
		if (message !== null) {
			toastSeq.current += 1;
			setToast({
				seq: toastSeq.current,
				text: t("error.action", { message })
			});
		}
	};
	const choose = (selection) => {
		if (state.current?.provider === selection.provider && state.current.model === selection.model) {
			close(true);
			return;
		}
		lastAction.current = "select";
		select(selection).then(settleSelection);
	};
	const chooseEffort = (effort) => {
		if (state.current === null) return;
		if (effectiveEffort === effort) {
			close(true);
			return;
		}
		lastAction.current = "select";
		select({
			provider: state.current.provider,
			model: state.current.model,
			...effort === void 0 ? {} : { reasoningEffort: effort }
		}).then(settleSelection);
	};
	const modelLabel = current?.model.name ?? t("trigger.fallback");
	const triggerLabel = effortLabel === void 0 ? modelLabel : `${modelLabel} · ${effortLabel}`;
	const triggerAria = current === void 0 ? t("trigger.selectAria") : effortLabel === void 0 ? t("trigger.aria", { model: modelLabel }) : t("trigger.ariaEffort", {
		model: modelLabel,
		effort: effortLabel
	});
	itemRefs.current = [];
	let itemIndex = 0;
	const itemRef = () => {
		const at = itemIndex++;
		return (node) => {
			itemRefs.current[at] = node;
		};
	};
	const loadError = state.error !== null && lastAction.current === "load" && /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
		className: AccountsSection_module_css_default.seatError,
		children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", { children: t("error.action", { message: state.error ?? "" }) }), /* @__PURE__ */ (0, react_jsx_runtime.jsx)("button", {
			type: "button",
			className: AccountsSection_module_css_default.seatRetry,
			onClick: reload,
			children: t("retry")
		})]
	});
	const option = (selected, onClick, label, description) => /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("button", {
		ref: itemRef(),
		type: "button",
		role: "menuitemradio",
		"aria-checked": selected,
		className: selected ? `${AccountsSection_module_css_default.seatOption} ${AccountsSection_module_css_default.seatSelected}` : AccountsSection_module_css_default.seatOption,
		disabled: busy,
		onClick,
		children: [/* @__PURE__ */ (0, react_jsx_runtime.jsxs)("span", {
			className: AccountsSection_module_css_default.seatOptionCopy,
			children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", {
				className: AccountsSection_module_css_default.seatOptionName,
				children: label
			}), description !== void 0 && /* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", {
				className: AccountsSection_module_css_default.seatOptionDescription,
				children: description
			})]
		}), /* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", {
			className: AccountsSection_module_css_default.seatCheck,
			children: selected ? /* @__PURE__ */ (0, react_jsx_runtime.jsx)(__deepseek_ai_dsh_client_ui_primitives.IconCheckOutline16, {}) : null
		})]
	});
	return /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
		ref: rootRef,
		className: AccountsSection_module_css_default.seatRoot,
		onKeyDown: onRootKeyDown,
		onBlur,
		children: [
			/* @__PURE__ */ (0, react_jsx_runtime.jsxs)("button", {
				ref: triggerRef,
				type: "button",
				className: AccountsSection_module_css_default.seatTrigger,
				"aria-label": triggerAria,
				"aria-haspopup": "menu",
				"aria-expanded": open,
				"aria-controls": open ? `${id}-menu` : void 0,
				title: triggerLabel,
				disabled: locked,
				onClick: () => {
					if (open) close();
					else {
						setPane("root");
						setOpen(true);
						reload();
					}
				},
				children: [
					current !== void 0 && /* @__PURE__ */ (0, react_jsx_runtime.jsx)(ProviderGlyph, {
						provider: current.group.id,
						displayName: current.group.name,
						size: 14
					}),
					/* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", {
						className: AccountsSection_module_css_default.seatTriggerLabel,
						children: modelLabel
					}),
					effortLabel !== void 0 && /* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", {
						className: AccountsSection_module_css_default.seatTriggerEffort,
						children: effortLabel
					}),
					/* @__PURE__ */ (0, react_jsx_runtime.jsx)(__deepseek_ai_dsh_client_ui_primitives.IconChevronDownOutline14, { className: open ? AccountsSection_module_css_default.seatChevronOpen : AccountsSection_module_css_default.seatChevron })
				]
			}),
			open && /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
				id: `${id}-menu`,
				className: AccountsSection_module_css_default.seatMenu,
				role: "menu",
				"aria-label": t("menu.aria"),
				"aria-busy": state.status === "loading" || busy,
				children: [
					pane === "root" && /* @__PURE__ */ (0, react_jsx_runtime.jsxs)(react_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, react_jsx_runtime.jsxs)("button", {
						ref: itemRef(),
						type: "button",
						role: "menuitem",
						className: AccountsSection_module_css_default.seatCell,
						onClick: () => setPane("model"),
						children: [
							/* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", {
								className: AccountsSection_module_css_default.seatCellLabel,
								children: t("menu.model")
							}),
							/* @__PURE__ */ (0, react_jsx_runtime.jsxs)("span", {
								className: AccountsSection_module_css_default.seatCellValue,
								children: [current !== void 0 && /* @__PURE__ */ (0, react_jsx_runtime.jsx)(ProviderGlyph, {
									provider: current.group.id,
									displayName: current.group.name,
									size: 14
								}), /* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", {
									className: AccountsSection_module_css_default.seatCellValueText,
									title: modelLabel,
									children: modelLabel
								})]
							}),
							/* @__PURE__ */ (0, react_jsx_runtime.jsx)(__deepseek_ai_dsh_client_ui_primitives.IconChevronRightOutline14, { className: AccountsSection_module_css_default.seatCellChevron })
						]
					}), reasoning !== void 0 && /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("button", {
						ref: itemRef(),
						type: "button",
						role: "menuitem",
						className: AccountsSection_module_css_default.seatCell,
						onClick: () => setPane("effort"),
						children: [
							/* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", {
								className: AccountsSection_module_css_default.seatCellLabel,
								children: t("menu.effort")
							}),
							/* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", {
								className: AccountsSection_module_css_default.seatCellValue,
								children: /* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", {
									className: AccountsSection_module_css_default.seatCellValueText,
									children: effortLabel
								})
							}),
							/* @__PURE__ */ (0, react_jsx_runtime.jsx)(__deepseek_ai_dsh_client_ui_primitives.IconChevronRightOutline14, { className: AccountsSection_module_css_default.seatCellChevron })
						]
					})] }),
					pane === "model" && /* @__PURE__ */ (0, react_jsx_runtime.jsxs)(react_jsx_runtime.Fragment, { children: [
						state.status === "loading" && /* @__PURE__ */ (0, react_jsx_runtime.jsx)("div", {
							className: AccountsSection_module_css_default.seatStatus,
							children: t("status.loading")
						}),
						loadError,
						state.failures.map((failure) => /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
							className: AccountsSection_module_css_default.seatWarning,
							children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", { children: t("warning.groupLoad", {
								name: failure.name,
								message: failure.message
							}) }), /* @__PURE__ */ (0, react_jsx_runtime.jsx)("button", {
								type: "button",
								className: AccountsSection_module_css_default.seatRetry,
								onClick: reload,
								children: t("retry")
							})]
						}, failure.id)),
						/* @__PURE__ */ (0, react_jsx_runtime.jsx)("div", {
							className: `${AccountsSection_module_css_default.seatGroups} scrollable`,
							children: state.groups.map((group) => /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("section", {
								role: "group",
								"aria-labelledby": `${id}-${group.id}`,
								className: AccountsSection_module_css_default.seatGroup,
								children: [/* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
									className: AccountsSection_module_css_default.seatGroupTitle,
									id: `${id}-${group.id}`,
									children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)(ProviderGlyph, {
										provider: group.id,
										displayName: group.name,
										size: 14
									}), group.name]
								}), group.models.map((model) => option(state.current?.provider === group.id && state.current.model === model.id, () => choose({
									provider: group.id,
									model: model.id,
									...model.reasoning?.defaultEffort === void 0 ? {} : { reasoningEffort: model.reasoning.defaultEffort }
								}), model.name, model.description))]
							}, group.id))
						}),
						state.status === "ready" && choices.length === 0 && /* @__PURE__ */ (0, react_jsx_runtime.jsx)("div", {
							className: AccountsSection_module_css_default.seatEmpty,
							children: t("empty.models")
						})
					] }),
					pane === "effort" && /* @__PURE__ */ (0, react_jsx_runtime.jsxs)(react_jsx_runtime.Fragment, { children: [loadError, effortChoices.length === 0 ? /* @__PURE__ */ (0, react_jsx_runtime.jsx)("div", {
						className: AccountsSection_module_css_default.seatEmpty,
						children: t("empty.efforts")
					}) : effortChoices.map((level) => /* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", {
						style: { display: "contents" },
						children: option(effectiveEffort === level.effort, () => chooseEffort(level.effort), level.label, "description" in level ? level.description : void 0)
					}, level.key))] })
				]
			}),
			toast !== null && /* @__PURE__ */ (0, react_jsx_runtime.jsx)(__deepseek_ai_dsh_client_ui_primitives.Toast, {
				text: toast.text,
				icon: /* @__PURE__ */ (0, react_jsx_runtime.jsx)(__deepseek_ai_dsh_client_ui_primitives.IconWarningOutline16, {}),
				anchor: rootRef.current?.closest("[data-composer-card]") ?? null,
				onDone: () => setToast(null)
			}, toast.seq)
		]
	});
}

//#endregion
//#region src/client/locales.ts
/** Copy dictionaries for the Accounts settings section. */
/** Chinese strings; dsh's product copy is Chinese, so this pair leads. */
const zh = {
	nav: "账户",
	intro: "登录模型提供方。订阅账号走 OAuth 授权，其余填 API 密钥；两者都会自动接到模型选择器里。",
	search: "搜索提供方",
	groupConnected: "已连接",
	groupAll: "全部提供方",
	empty: "没有匹配的提供方。",
	loading: "加载中…",
	retry: "重试",
	statusSignedIn: "已登录",
	statusApiKey: "已配置 API 密钥",
	statusAmbient: "由环境提供（{source}）",
	statusMissing: "未配置",
	expiresAt: "有效期至 {time}",
	expired: "访问令牌已过期，下次请求时自动续期；若续期失败会在此提示重新登录。",
	reference: "凭据引用 {ref}",
	noRoute: "还没出现在「模型」页，模型不会进入选择器。",
	routeNow: "加入「模型」页",
	routing: "写入中…",
	subscription: "订阅",
	models: "可用模型（{count}）",
	modelsEmpty: "这条路由目前没有模型。",
	modelsExpand: "展开其余 {count} 个",
	modelsCollapse: "收起",
	modalityImage: "图像",
	updateCatalogs: "更新模型目录",
	updatingCatalogs: "更新中…",
	updateCatalog: "更新目录",
	updatingCatalog: "更新中…",
	catalogChecked: "目录更新于 {time}",
	catalogUpdated: "{count} 个提供方的目录有更新，现共 {models} 个模型。",
	catalogUnchanged: "模型目录已是最新。",
	catalogPartial: "{count} 个提供方更新失败（{providers}）：{reason}。其余更新已生效。",
	discoverEndpoint: "从端点获取…",
	discoverEndpointLabel: "OpenAI 兼容端点地址",
	discoverSubmit: "获取",
	discoveringEndpoint: "获取中…",
	discoverHint: "读取该端点的 /v1/models 清单并整体替换模型列表。适合目录里没有的自建或代理端点；端点只报告 id，模态与协议仍沿用目录已知的值。",
	discovered: "端点报告了 {count} 个模型，已写入。",
	signInOauthNamed: "使用 {name} 登录",
	signInApiKey: "填写 API 密钥",
	signInAgain: "重新登录",
	replaceApiKey: "更换 API 密钥",
	signOut: "退出登录",
	signingOut: "退出中…",
	logoutTitle: "退出 {provider}？",
	logoutDescription: "将删除本机保存的凭据。想再用就得重新登录一次。",
	logoutConfirm: "退出登录",
	removeRoute: "同时从「模型」页移除该提供方",
	removeRouteHint: "那条记录可能还带着你自己改过的模型列表或网关地址，默认保留。",
	noMethods: "这个提供方没有可交互的登录方式，它使用本机凭据（如 AWS 配置文件、ADC 文件）。",
	importFrom: "使用 {source} 登录",
	importing: "关联中…",
	importTitle: "使用 {source} 的登录？",
	importDescription: "直接使用本机已有的登录，无需再登录一次。之后令牌会与 {source} 双向同步：任何一边刷新，另一边继续可用。",
	importConfirm: "关联",
	loginTitle: "登录 {provider}",
	openLink: "打开授权页面",
	copyLink: "复制链接",
	copied: "已复制",
	deviceCodeTitle: "在浏览器中输入以下代码",
	deviceCodeUrl: "打开验证页面",
	waiting: "等待授权完成…",
	submit: "提交",
	cancel: "取消",
	close: "关闭",
	done: "登录成功。",
	loginFailed: "登录失败",
	secretPlaceholder: "粘贴密钥",
	revealSecret: "显示密钥",
	hideSecret: "隐藏密钥"
};
/** English strings. */
const en = {
	nav: "Accounts",
	intro: "Sign in to model providers. Subscription accounts use OAuth; the rest take an API key. Either way the models reach the picker.",
	search: "Search providers",
	groupConnected: "Connected",
	groupAll: "All providers",
	empty: "No provider matches.",
	loading: "Loading…",
	retry: "Retry",
	statusSignedIn: "Signed in",
	statusApiKey: "API key configured",
	statusAmbient: "From the environment ({source})",
	statusMissing: "Not configured",
	expiresAt: "Valid until {time}",
	expired: "Access token expired; it renews on the next request. A failed renewal reports here asking to sign in again.",
	reference: "Credential reference {ref}",
	noRoute: "Not on the Models page yet, so its models never reach the picker.",
	routeNow: "Add to the Models page",
	routing: "Writing…",
	subscription: "Subscription",
	models: "Models ({count})",
	modelsEmpty: "This route serves no models yet.",
	modelsExpand: "Show {count} more",
	modelsCollapse: "Show fewer",
	modalityImage: "Images",
	updateCatalogs: "Update model catalogs",
	updatingCatalogs: "Updating…",
	updateCatalog: "Update catalog",
	updatingCatalog: "Updating…",
	catalogChecked: "Catalog checked {time}",
	catalogUpdated: "{count} provider catalog(s) changed; {models} models served.",
	catalogUnchanged: "Model catalogs are up to date.",
	catalogPartial: "{count} provider(s) could not be updated ({providers}): {reason}. The rest were applied.",
	discoverEndpoint: "Read an endpoint…",
	discoverEndpointLabel: "OpenAI-compatible endpoint",
	discoverSubmit: "Read",
	discoveringEndpoint: "Reading…",
	discoverHint: "Reads this endpoint’s /v1/models listing and replaces the model list with it. Meant for a self-hosted or proxied endpoint the catalog does not cover; a listing reports ids only, so modalities and protocol keep whatever the catalog already knew.",
	discovered: "The endpoint reported {count} models, now recorded.",
	signInOauthNamed: "Sign in with {name}",
	signInApiKey: "Enter an API key",
	signInAgain: "Sign in again",
	replaceApiKey: "Replace the API key",
	signOut: "Sign out",
	signingOut: "Signing out…",
	logoutTitle: "Sign out of {provider}?",
	logoutDescription: "The credential stored on this machine is deleted. Using it again means signing in again.",
	logoutConfirm: "Sign out",
	removeRoute: "Also remove it from the Models page",
	removeRouteHint: "That entry may still carry a model list or gateway URL you edited yourself, so it is kept by default.",
	noMethods: "This provider offers no interactive login; it uses local credentials such as an AWS profile or ADC files.",
	importFrom: "Use {source} login",
	importing: "Linking…",
	importTitle: "Use the {source} login?",
	importDescription: "Uses the login already on this machine, no fresh sign-in needed. Tokens then stay in sync with {source} both ways: whichever side refreshes, the other keeps working.",
	importConfirm: "Link",
	loginTitle: "Sign in to {provider}",
	openLink: "Open the authorization page",
	copyLink: "Copy the link",
	copied: "Copied",
	deviceCodeTitle: "Enter this code in your browser",
	deviceCodeUrl: "Open the verification page",
	waiting: "Waiting for the authorization to complete…",
	submit: "Submit",
	cancel: "Cancel",
	close: "Close",
	done: "Signed in.",
	loginFailed: "Login failed",
	secretPlaceholder: "Paste the key",
	revealSecret: "Show the key",
	hideSecret: "Hide the key"
};

//#endregion
//#region src/client/index.ts
/** Dictionary namespace owned by this plugin. */
const NS = "settings.accounts";
/**
* Required services. The target slot is declared by the settings base
* package, whose activation order relative to this one is not constrained —
* registration waits on the declaration through `slots.inject()`, not on a
* service edge.
*/
const inject = ["slots", "locale"];
/** Register the Accounts section and its copy. */
function apply(ctx) {
	ctx.effect(() => ctx.locale.register(NS, {
		zh,
		en
	}), "dsh-providers: copy dictionaries");
	const controller = new AccountsStore();
	const useSnapshot = (0, __deepseek_ai_dsh_client_web_react.bindSnapshotSelector)(controller);
	ctx.effect(() => () => controller.dispose(), "dsh-providers: account store");
	const t = ctx.locale.bind(NS);
	const injected = () => ({
		controller,
		useSnapshot,
		t
	});
	ctx.slots.inject("settings.section", () => ctx.slots.register({
		name: "settings.section",
		id: "accounts",
		order: 11,
		label: () => t("nav"),
		inject: injected
	}, AccountsSection));
	ctx.inject([
		"slots",
		"modelDirectories",
		"sessions"
	], (scope) => {
		scope.slots.inject("conversation.input.model", () => scope.slots.register({
			name: "conversation.input.model",
			locale: "model",
			priority: -1,
			inject: (sessionId) => {
				const directory = scope.modelDirectories.directoryFor(sessionId);
				const available = scope.sessions.subagentAddress(sessionId) === void 0;
				return {
					available,
					directory: directory.store,
					load: () => {
						if (available) directory.load().catch(() => {});
					},
					select: (selection) => available ? directory.select(selection).then(() => true, () => false) : Promise.resolve(false)
				};
			}
		}, ModelSeat));
	});
}

//#endregion
exports.apply = apply;
exports.inject = inject;
return module.exports; } });
//# sourceMappingURL=client.js.map