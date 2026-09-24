/**
 * @title WET-BOEW Accessible Treeview Plugin
 * @overview Automated WAI-ARIA compliant nested tree view structures.
 */
(function ($, globalThis, document, wb) {
    "use strict";

    var componentName = "wb-treeview";
    var selector = "." + componentName;
    var initEvent = "wb-init" + selector;

    /**
     * Core Plugin Initialization Hook
     */
    $(document).on(initEvent + " timerpoke.wb", selector, function (event) {
        var eventTarget = event.currentTarget;
        if (eventTarget._treeInstance === undefined || eventTarget._treeInstance === null) {
            initPlugin(eventTarget);
        }
    });

    /**
     * Framework Fallback Scanner
     * Forces execution if the framework loaded before this asset parsed
     */
    $(document).on("wb-ready.wb", function () {
        var nodes = document.querySelectorAll(selector);
        var i = 0;
        while (i < nodes.length) {
            var node = nodes[i];
            if (node._treeInstance === undefined || node._treeInstance === null) {
                initPlugin(node);
            }
            i = i + 1;
        }
    });

    /**
     * Initialize Plugin Instance
     */
    function initPlugin(element) {
        var $treeNode = $(element);
        var treeObj = createTree(element);
        
        $treeNode.attr("role", "tree");
        $treeNode.attr("data-tree-initialized", "true");
        element._treeInstance = treeObj;

        findTreeitems(element, treeObj, null);
        updateVisibleTreeitems(treeObj);

        if (treeObj.firstTreeitem !== null) {
            if (treeObj.firstTreeitem.domNode !== null) {
                treeObj.firstTreeitem.domNode.tabIndex = 0;
            }
        }

        // External Component Event Orchestration Listeners
        $treeNode.off("expandall.wb-treeview").on("expandall.wb-treeview", function () {
            triggerGlobalExpansion(element, true);
        });

        $treeNode.off("collapseall.wb-treeview").on("collapseall.wb-treeview", function () {
            triggerGlobalExpansion(element, false);
        });

        checkQueryStringTriggers(element);
        
        wb.ready($treeNode, componentName);
    }

    /**
     * Data Instance Factories
     */
    function createTree(node) {
        if (typeof node !== "object") {
            return null;
        }
        return {
            domNode: node,
            treeitems: [],
            firstChars: [],
            firstTreeitem: null,
            lastTreeitem: null,
            selectedItem: null
        };
    }

    function createTreeitem(node, treeObj, group) {
        if (typeof node !== "object") {
            return null;
        }

        var label = "";
        var titleSpan = node.querySelector(".tv-title");
        var linkChild = node.querySelector("a.tv-page-link");

        if (node.getAttribute("aria-label") !== null) {
            label = node.getAttribute("aria-label").trim();
        } else if (titleSpan !== null) {
            label = titleSpan.textContent.trim();
        } else if (linkChild !== null) {
            label = linkChild.textContent.trim();
        } else {
            label = node.textContent.trim();
        }

        var isExpandable = false;
        var elem = node.firstElementChild;
        while (elem !== null) {
            if (elem.tagName.toLowerCase() === "ul" && elem.getAttribute("role") === "group") {
                isExpandable = true;
            }
            elem = elem.nextElementSibling;
        }

        var inGroupFlag = false;
        if (group !== null) {
            inGroupFlag = true;
        }

        return {
            tree: treeObj,
            groupTreeitem: group,
            domNode: node,
            label: label,
            isExpandable: isExpandable,
            isVisible: false,
            inGroup: inGroupFlag
        };
    }

    /**
     * DOM Analysis & Tree Parsing Engines
     */
    function findTreeitems(node, tree, group) {
        var elem = node.firstElementChild;
        var ti = group;
        while (elem !== null) {
            if (elem.tagName.toLowerCase() === "li" && elem.getAttribute("role") === "treeitem") {
                ti = createTreeitem(elem, tree, group);
                initTreeitem(ti);
                if (tree !== null) {
                    if (tree.treeitems !== null) {
                        if (tree.firstChars !== null) {
                            tree.treeitems.push(ti);
                            tree.firstChars.push(ti.label.substring(0, 1).toLowerCase());
                        }
                    }
                }
            }
            if (elem.firstElementChild !== null) {
                findTreeitems(elem, tree, ti);
            }
            elem = elem.nextElementSibling;
        }
    }

    function initTreeitem(treeitem) {
        treeitem.domNode.tabIndex = -1;
        if (treeitem.isExpandable === true) {
            if (treeitem.domNode.getAttribute("aria-expanded") === null) {
                treeitem.domNode.setAttribute("aria-expanded", "false");
            }
        }
        
        treeitem.domNode.addEventListener("keydown", function (event) {
            handleTreeitemKeydown(treeitem, event);
        });
        treeitem.domNode.addEventListener("click", function (event) {
            handleTreeitemClick(treeitem, event);
        });
        treeitem.domNode.addEventListener("focus", function () {
            handleTreeitemFocus(treeitem);
        });
        treeitem.domNode.addEventListener("blur", function () {
            handleTreeitemBlur(treeitem);
        });
        if (treeitem.isExpandable === false) {
            treeitem.domNode.addEventListener("mouseover", function (event) {
                handleTreeitemMouseOver(event);
            });
            treeitem.domNode.addEventListener("mouseout", function (event) {
                handleTreeitemMouseOut(event);
            });
        }
    }

    /**
     * Contextual Visibility State Tracking
     */
    function updateVisibleTreeitems(tree) {
        var i = 0;
        if (tree !== null) {
            if (tree.treeitems !== null) {
                tree.firstTreeitem = null;
                tree.lastTreeitem = null;
                while (i < tree.treeitems.length) {
                    var ti = tree.treeitems[i];
                    var parent = ti.domNode.parentNode;
                    ti.isVisible = true;
                    while (parent !== null && parent !== tree.domNode) {
                        if (parent.getAttribute("aria-expanded") === "false") {
                            ti.isVisible = false;
                        }
                        parent = parent.parentNode;
                    }
                    if (ti.isVisible === true) {
                        if (tree.firstTreeitem === null) {
                            tree.firstTreeitem = ti;
                        }
                        tree.lastTreeitem = ti;
                    }
                    i = i + 1;
                }
            }
        }
    }

    function isExpandedItemState(treeitem) {
        if (treeitem.isExpandable === true) {
            if (treeitem.domNode.getAttribute("aria-expanded") === "true") {
                return true;
            }
        }
        return false;
    }

    /**
     * Focused Element State Managers
     */
    function setSelectedToItem(tree, treeitem) {
        if (tree.selectedItem !== null) {
            tree.selectedItem.domNode.setAttribute("aria-selected", "false");
        }
        treeitem.domNode.setAttribute("aria-selected", "true");
        tree.selectedItem = treeitem;
    }

    function setFocusToItem(tree, treeitem) {
        var i = 0;
        while (i < tree.treeitems.length) {
            var ti = tree.treeitems[i];
            if (ti === treeitem) {
                ti.domNode.tabIndex = 0;
                ti.domNode.focus();
            } else {
                ti.domNode.tabIndex = -1;
            }
            i = i + 1;
        }
    }

    function setFocusToNextItem(tree, currentItem) {
        var nextItem = null;
        var i = tree.treeitems.length - 1;
        while (i >= 0) {
            var ti = tree.treeitems[i];
            if (ti === currentItem) {
                i = -1;
            } else {
                if (ti.isVisible === true) {
                    nextItem = ti;
                }
                i = i - 1;
            }
        }
        if (nextItem !== null) {
            setFocusToItem(tree, nextItem);
        }
    }

    function setFocusToPreviousItem(tree, currentItem) {
        var prevItem = null;
        var i = 0;
        while (i < tree.treeitems.length) {
            var ti = tree.treeitems[i];
            if (ti === currentItem) {
                i = tree.treeitems.length;
            } else {
                if (ti.isVisible === true) {
                    prevItem = ti;
                }
                i = i + 1;
            }
        }
        if (prevItem !== null) {
            setFocusToItem(tree, prevItem);
        }
    }

    /**
     * Traversal Selection Routines
     */
    function setFocusToParentItem(tree, currentItem) {
        if (currentItem.groupTreeitem !== null) {
            setFocusToItem(tree, currentItem.groupTreeitem);
        }
    }

    function setFocusToFirstItem(tree) {
        if (tree.firstTreeitem !== null) {
            setFocusToItem(tree, tree.firstTreeitem);
        }
    }

    function setFocusToLastItem(tree) {
        if (tree.lastTreeitem !== null) {
            setFocusToItem(tree, tree.lastTreeitem);
        }
    }

    function setFocusByFirstCharacter(tree, currentItem, char) {
        char = char.toLowerCase();
        var start = tree.treeitems.indexOf(currentItem) + 1;
        if (start === tree.treeitems.length) {
            start = 0;
        }
        var index = getIndexFirstChars(tree, start, char);
        if (index === -1) {
            index = getIndexFirstChars(tree, 0, char);
        }
        if (index > -1) {
            setFocusToItem(tree, tree.treeitems[index]);
        }
    }

    function getIndexFirstChars(tree, startIndex, char) {
        var i = startIndex;
        while (i < tree.firstChars.length) {
            if (tree.treeitems[i].isVisible === true) {
                if (char === tree.firstChars[i]) {
                    return i;
                }
            }
            i = i + 1;
        }
        return -1;
    }

    /**
     * Expansion State Structural Toggles
     */
    function expandTreeitem(tree, currentItem) {
        if (currentItem.isExpandable === true) {
            currentItem.domNode.setAttribute("aria-expanded", "true");
            updateVisibleTreeitems(tree);
            checkRecursiveAutoExpansion(tree, currentItem);
        }
    }

    /**
    * Evaluates immediate visible group boundaries to trigger cascading
    * folder updates down isolated structural pathways.
    */
    function checkRecursiveAutoExpansion(tree, currentItem) {
        var groupContainer = currentItem.domNode.querySelector('ul[role="group"]');
        if (groupContainer !== null) {
            var immediateItems = groupContainer.children;
            var folderCount = 0;
            var linkCount = 0;
            var targetItem = null;
            var k = 0;
            while (k < immediateItems.length) {
                var childNode = immediateItems[k];
                if (childNode.tagName.toLowerCase() === "li" && childNode.getAttribute("role") === "treeitem") {
                    var isFolder = false;
                    var subElem = childNode.firstElementChild;
                    while (subElem !== null) {
                        if (subElem.tagName.toLowerCase() === "ul" && subElem.getAttribute("role") === "group") {
                            isFolder = true;
                        }
                        subElem = subElem.nextElementSibling;
                    }
                    if (isFolder === true) {
                        folderCount = folderCount + 1;
                        var m = 0;
                        while (m < tree.treeitems.length) {
                            if (tree.treeitems[m].domNode === childNode) {
                                targetItem = tree.treeitems[m];
                            }
                            m = m + 1;
                        }
                    } else {
                        linkCount = linkCount + 1;
                    }
                }
                k = k + 1;
            }
            if (folderCount === 1 && linkCount === 0) {
                if (targetItem !== null) {
                    expandTreeitem(tree, targetItem);
                }
            }
        }
    }

    function expandAllSiblingItems(tree, currentItem) {
        var i = 0;
        while (i < tree.treeitems.length) {
            var ti = tree.treeitems[i];
            if (ti.groupTreeitem === currentItem.groupTreeitem) {
                if (ti.isExpandable === true) {
                    expandTreeitem(tree, ti);
                }
            }
            i = i + 1;
        }
    }

    function collapseTreeitem(tree, currentItem) {
        var groupTreeitem = null;
        if (isExpandedItemState(currentItem) === true) {
            groupTreeitem = currentItem;
        } else {
            groupTreeitem = currentItem.groupTreeitem;
        }
        if (groupTreeitem !== null) {
            groupTreeitem.domNode.setAttribute("aria-expanded", "false");
            collapseChildrenNodes(groupTreeitem);
            updateVisibleTreeitems(tree);
            setFocusToItem(tree, groupTreeitem);
        }
    }

    function collapseChildrenNodes(parentItem) {
        var childItems = parentItem.domNode.querySelectorAll('li[role="treeitem"]');
        var i = 0;
        while (i < childItems.length) {
            var item = childItems[i];
            var hasGroup = item.querySelector('ul[role="group"]');
            if (hasGroup !== null) {
                item.setAttribute("aria-expanded", "false");
            }
            i = i + 1;
        }
    }

    /**
     * Event Handling Infrastructure
     */
    function handleTreeitemKeydown(treeitem, event) {
        var flag = false;
        var key = event.key;

        if (event.altKey === true || event.ctrlKey === true || event.metaKey === true) {
            return;
        }
        if (event.shiftKey === true) {
            if (key.length === 1) {
                if (key.match(/\S/) !== null) {
                    setFocusByFirstCharacter(treeitem.tree, treeitem, key);
                    flag = true;
                }
            }
        } else {
            switch (key) {
                case "Enter":
                case " ":
                    if (treeitem.isExpandable === false) {
                        setFocusToItem(treeitem.tree, treeitem);
                    }
                    setSelectedToItem(treeitem.tree, treeitem);
                    flag = true;
                    break;
                case "ArrowUp":
                    setFocusToPreviousItem(treeitem.tree, treeitem);
                    flag = true;
                    break;
                case "ArrowDown":
                    setFocusToNextItem(treeitem.tree, treeitem);
                    flag = true;
                    break;
                case "ArrowRight":
                    if (treeitem.isExpandable === true) {
                        if (isExpandedItemState(treeitem) === true) {
                            setFocusToNextItem(treeitem.tree, treeitem);
                        } else {
                            expandTreeitem(treeitem.tree, treeitem);
                        }
                    }
                    flag = true;
                    break;
                case "ArrowLeft":
                    if (treeitem.isExpandable === true) {
                        if (isExpandedItemState(treeitem) === true) {
                            collapseTreeitem(treeitem.tree, treeitem);
                            flag = true;
                        }
                    }
                    if (flag === false) {
                        if (treeitem.inGroup === true) {
                            setFocusToParentItem(treeitem.tree, treeitem);
                            flag = true;
                        }
                    }
                    break;
                case "Home":
                    setFocusToFirstItem(treeitem.tree);
                    flag = true;
                    break;
                case "End":
                    setFocusToLastItem(treeitem.tree);
                    flag = true;
                    break;
                case "":
                    expandAllSiblingItems(treeitem.tree, treeitem);
                    flag = true;
                    break;
                default:
                    if (key.length === 1) {
                        if (key.match(/\S/) !== null) {
                            setFocusByFirstCharacter(treeitem.tree, treeitem, key);
                            flag = true;
                        }
                    }
                    break;
            }
        }
        if (flag === true) {
            event.stopPropagation();
            event.preventDefault();
        }
    }

    function handleTreeitemClick(treeitem, event) {
        var targetNode = event.target;
        var isTitleClick = false;
        var isLinkClick = false;
        if (targetNode !== null) {
            if (targetNode.classList !== null) {
                if (targetNode.classList.contains("tv-title") === true || targetNode.closest(".tv-title") !== null) {
                    isTitleClick = true;
                }
                if (targetNode.classList.contains("tv-page-link") === true || targetNode.closest("a.tv-page-link") !== null) {
                    isLinkClick = true;
                }
            }
        }
        if (isTitleClick === true || isLinkClick === true) {
            if (treeitem.isExpandable === true) {
                if (isExpandedItemState(treeitem) === true) {
                    collapseTreeitem(treeitem.tree, treeitem);
                } else {
                    expandTreeitem(treeitem.tree, treeitem);
                }
            } else {
                setFocusToItem(treeitem.tree, treeitem);
            }
            setSelectedToItem(treeitem.tree, treeitem);
        }
        event.stopPropagation();
    }

    function handleTreeitemFocus(treeitem) {
        var node = treeitem.domNode;
        if (treeitem.isExpandable === true) {
            var titleSpan = node.querySelector(".tv-title");
            if (titleSpan !== null) {
                node = titleSpan;
            } else {
                node = node.firstElementChild;
            }
        }
        node.classList.add("focus");
    }

    function handleTreeitemBlur(treeitem) {
        var node = treeitem.domNode;
        if (treeitem.isExpandable === true) {
            var titleSpan = node.querySelector(".tv-title");
            if (titleSpan !== null) {
                node = titleSpan;
            } else {
                node = node.firstElementChild;
            }
        }
        node.classList.remove("focus");
    }

    function handleTreeitemMouseOver(event) {
        event.currentTarget.classList.add("hover");
    }

    function handleTreeitemMouseOut(event) {
        event.currentTarget.classList.remove("hover");
    }

    /**
     * Internal Core Shared Execution Processors
     */
    function triggerGlobalExpansion(treeNode, shouldExpand) {
        var treeItems = treeNode.querySelectorAll('li[role="treeitem"]');
        var j = 0;
        while (j < treeItems.length) {
            var itemNode = treeItems[j];
            var hasGroup = itemNode.querySelector('ul[role="group"]');
            if (hasGroup !== null) {
                if (shouldExpand === true) {
                    itemNode.setAttribute("aria-expanded", "true");
                } else {
                    itemNode.setAttribute("aria-expanded", "false");
                }
            }
            j = j + 1;
        }
        if (treeNode._treeInstance !== undefined && treeNode._treeInstance !== null) {
            updateVisibleTreeitems(treeNode._treeInstance);
        }
    }

    function checkQueryStringTriggers(treeNode) {
        var urlParams = new URLSearchParams(globalThis.location.search);
        var treeParam = urlParams.get("tree");
        var actionParam = urlParams.get("action");
        if (treeParam === "expand" || actionParam === "expandall") {
            triggerGlobalExpansion(treeNode, true);
        }
        if (treeParam === "collapse" || actionParam === "collapseall") {
            triggerGlobalExpansion(treeNode, false);
        }
    }
})(jQuery, globalThis, document, wb);

/*
*Isolated Global Control Trigger Initialization (Separated Component Orchestration)
*/
(function ($, wb) {
    "use strict";

    // Unified click handler for targeted expansion triggers
    $(document).on("click", "[data-tree-action=\"expandall\"]", function (event) {
        event.preventDefault();
        
        var targetSelector = $(this).data("treeTarget");
        var $targetTree = null;

        if (targetSelector !== undefined && targetSelector !== null && targetSelector !== "") {
            $targetTree = $(targetSelector);
        } else {
            $targetTree = $(".wb-treeview");
        }
        
        $targetTree.trigger("expandall.wb-treeview");
    });

    // Unified click handler for targeted collapse triggers
    $(document).on("click", "[data-tree-action=\"collapseall\"]", function (event) {
        event.preventDefault();
        
        var targetSelector = $(this).data("treeTarget");
        var $targetTree = null;

        if (targetSelector !== undefined && targetSelector !== null && targetSelector !== "") {
            $targetTree = $(targetSelector);
        } else {
            $targetTree = $(".wb-treeview");
        }
        
        $targetTree.trigger("collapseall.wb-treeview");
    });
})(jQuery, wb);